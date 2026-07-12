const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Enable Cross-Origin Resource Sharing so mobile phones on the network can access the API
app.use(cors());

// Parse large JSON payloads (in case of large base64 images or logs)
app.use(express.json({ limit: '50mb' }));



// Parse local .env file manually if it exists to retrieve MONGODB_URI
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join('=').trim();
        if (key && val && !process.env[key]) {
          process.env[key] = val;
        }
      }
    });
  }
} catch (e) {
  console.warn("No local .env file parsed:", e.message);
}

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.warn("⚠️ WARNING: MONGODB_URI environment variable is not defined! Database requests will fail.");
} else {
  console.log("Connecting to MongoDB Atlas...");
  mongoose.connect(mongoUri)
    .then(() => {
      console.log("🚀 Connected to MongoDB Atlas successfully!");
    })
    .catch(err => {
      console.error("❌ MongoDB connection error:", err.message);
    });
}

// Database Schema definition for key-value records
const StoreRecordSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

const StoreRecord = mongoose.model('StoreRecord', StoreRecordSchema);

// GET full database
app.get('/api/data', async (req, res) => {
  if (!mongoUri || mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database connection is pending or not configured. Please check MONGODB_URI." });
  }
  try {
    const records = await StoreRecord.find({});
    const db = {};
    const leakedKeys = ["chronex_current_user", "chronex_cart", "chronex_wishlist", "chronex_admin_tab"];
    records.forEach(rec => {
      if (!leakedKeys.includes(rec.key)) {
        db[rec.key] = rec.value;
      }
    });
    return res.json(db);
  } catch (e) {
    console.error("Error reading from MongoDB:", e);
    return res.status(500).json({ error: "Database connection failed. Please refresh." });
  }
});

// POST to update database (Merge strategy)
app.post('/api/data', async (req, res) => {
  if (!mongoUri || mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database connection is pending or not configured. Please check MONGODB_URI." });
  }
  const newData = req.body;
  try {
    const keys = Object.keys(newData);
    const leakedKeys = ["chronex_current_user", "chronex_cart", "chronex_wishlist", "chronex_admin_tab"];
    const filteredKeys = keys.filter(key => !leakedKeys.includes(key));

    const promises = filteredKeys.map(key => {
      return StoreRecord.findOneAndUpdate(
        { key: key },
        { key: key, value: newData[key] },
        { upsert: true, new: true }
      );
    });
    await Promise.all(promises);
    return res.json({ success: true, dbType: "mongodb", timestamp: Date.now() });
  } catch (e) {
    console.error("Error writing to MongoDB:", e);
    return res.status(500).json({ error: "Database write failed. Please try again." });
  }
});

// --- Production: Serve Vite-built frontend ---
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    setHeaders: (res, filepath) => {
      if (path.basename(filepath) === 'index.html') {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
      }
    }
  }));
  // SPA fallback: serve index.html for all non-API routes, but return 404 for missing asset files
  app.get('*', (req, res) => {
    if (path.extname(req.path)) {
      res.status(404).send('Not Found');
    } else {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

const PORT = process.env.PORT || 3001;
// Listen on all network interfaces (0.0.0.0) so it's accessible over Wi-Fi
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================`);
  console.log(`🚀 Chronex Centralized Server Running!`);
  console.log(`📡 Accessible on Port: ${PORT}`);
  console.log(`======================================\n`);
});
