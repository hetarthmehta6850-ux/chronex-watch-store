const fs = require('fs');
let code = fs.readFileSync('src/context/ShopContext.jsx', 'utf8');

const saveToDbCode = `
  const saveToDb = (key, data) => {
    localStorage.setItem(key, data);
    const hostIp = window.location.hostname;
    try {
      const parsedData = JSON.parse(data);
      fetch(\`http://\${hostIp}:3001/api/data\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: parsedData })
      }).catch(err => console.error("Sync failed:", err));
    } catch (e) {
      fetch(\`http://\${hostIp}:3001/api/data\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: data })
      }).catch(err => console.error("Sync failed:", err));
    }
  };
`;

code = code.replace('export const ShopProvider = ({ children }) => {', 'export const ShopProvider = ({ children }) => {\n' + saveToDbCode);

// Replace ALL occurrences of localStorage.setItem
code = code.split('localStorage.setItem(').join('saveToDb(');
// Re-fix the literal one inside saveToDb that we just accidentally replaced
code = code.replace('saveToDb(key, data);', 'localStorage.setItem(key, data);');

fs.writeFileSync('src/context/ShopContext.jsx', code);
console.log('Central sync protocol injected flawlessly!');
