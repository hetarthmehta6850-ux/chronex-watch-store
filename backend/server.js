const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable Cross-Origin Resource Sharing so mobile phones on the network can access the API
app.use(cors());

// Parse large JSON payloads (in case of large base64 images or logs)
app.use(express.json({ limit: '50mb' }));

const dbPath = path.join(__dirname, 'db.json');

// Helper to read DB
const readDb = () => {
  if (fs.existsSync(dbPath)) {
    try {
      const data = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading db.json", e);
      return {};
    }
  }
  return {};
};

// GET full database
app.get('/api/data', (req, res) => {
  const db = readDb();
  res.json(db);
});

// POST to update database (Merge strategy)
app.post('/api/data', (req, res) => {
  const db = readDb();
  const newData = req.body;
  
  // Merge the new state into the existing database
  const updatedDb = { ...db, ...newData };
  
  // Save to disk
  fs.writeFileSync(dbPath, JSON.stringify(updatedDb, null, 2));
  
  res.json({ success: true, timestamp: Date.now() });
});

// --- Production: Serve Vite-built frontend ---
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // SPA fallback: serve index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
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
