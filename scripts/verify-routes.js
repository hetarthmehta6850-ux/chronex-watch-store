import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appPath = path.join(__dirname, '..', 'src', 'App.jsx');

console.log("========================================");
console.log("🧪 Chronex Automated Route Validation Test");
console.log("========================================\n");

if (!fs.existsSync(appPath)) {
  console.error("❌ ERROR: src/App.jsx not found!");
  process.exit(1);
}

const content = fs.readFileSync(appPath, 'utf8');

const requiredRoutes = [
  'path="/"',
  'path="/collections"',
  'path="/product/:id"',
  'path="/checkout"',
  'path="/invoice/:orderId"',
  'path="/admin"',
  'path="/warranty"',
  'path="/showroom-locator"'
];

let failed = false;

requiredRoutes.forEach(route => {
  if (content.includes(route)) {
    console.log(`✅ Route Verified: ${route}`);
  } else {
    console.error(`❌ ERROR: Missing route definition: ${route}`);
    failed = true;
  }
});

// Verify Suspense lazy boundary is active
if (content.includes('<Suspense') && content.includes('lazy(')) {
  console.log("✅ Code-Splitting Suspense boundary: Verified Active");
} else {
  console.error("❌ ERROR: Suspense or lazy() loading not active in App.jsx!");
  failed = true;
}

console.log("\n========================================");
if (failed) {
  console.error("💥 TEST FAILURE: One or more route checks failed!");
  process.exit(1);
} else {
  console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
  process.exit(0);
}
