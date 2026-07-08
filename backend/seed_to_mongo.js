const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Load local .env manually
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
} catch (e) {}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("❌ MONGODB_URI not found in environment or .env file!");
  console.log("Please create a backend/.env file and set MONGODB_URI before running this script.");
  process.exit(1);
}

const StoreRecordSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

const StoreRecord = mongoose.model('StoreRecord', StoreRecordSchema);

const seed = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(mongoUri);
    console.log("🚀 Connected successfully!");

    const dbPath = path.join(__dirname, 'db.json');
    if (!fs.existsSync(dbPath)) {
      console.error("❌ db.json file not found at " + dbPath);
      process.exit(1);
    }

    console.log("Reading db.json...");
    const rawData = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(rawData);

    const keys = Object.keys(data);
    console.log(`Found ${keys.length} keys to seed/migrate...`);

    for (const key of keys) {
      console.log(`Upserting key: "${key}"...`);
      await StoreRecord.findOneAndUpdate(
        { key: key },
        { key: key, value: data[key] },
        { upsert: true, new: true }
      );
    }

    console.log("🎉 Migration completed successfully! All data from db.json is now saved in MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

seed();
