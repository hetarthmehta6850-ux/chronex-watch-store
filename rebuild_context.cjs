const fs = require('fs');
const code = fs.readFileSync('src/context/ShopContext.jsx', 'utf8');
const lines = code.split('\n');

let newLines = [];
let i = 0;

while (i < 390) {
  newLines.push(lines[i]);
  i++;
}

const funcs = new Map();
let currentFunc = null;
let depth = 0;
let funcLines = [];
let contextExports = new Set();

while (i < lines.length) {
  const line = lines[i];
  
  if (depth === 0) {
    const match = line.match(/^  const ([a-zA-Z0-9_]+) = /);
    if (match) {
      currentFunc = match[1];
      funcLines = [line];
      contextExports.add(currentFunc);
      for(let char of line) {
        if(char === '{') depth++;
        if(char === '}') depth--;
      }
      if(depth === 0) {
        if(!funcs.has(currentFunc)) {
          funcs.set(currentFunc, [...funcLines]);
        }
        currentFunc = null;
      }
    } 
  } else {
    funcLines.push(line);
    for(let char of line) {
      if(char === '{') depth++;
      if(char === '}') depth--;
    }
    if (depth === 0 && currentFunc) {
      if(!funcs.has(currentFunc)) {
        funcs.set(currentFunc, [...funcLines]);
      }
      currentFunc = null;
    }
  }
  i++;
}

for (const [name, block] of funcs.entries()) {
  newLines.push('');
  newLines.push(...block);
}

const stateMatches = code.match(/const \[([a-zA-Z0-9_]+), set/g);
if (stateMatches) {
  stateMatches.forEach(m => {
    const stateName = m.replace('const [', '').replace(', set', '');
    contextExports.add(stateName);
  });
}

contextExports.add('currentUser');
contextExports.add('setCurrentUser');
contextExports.add('updatePromoBanner');
contextExports.add('formatPrice');

newLines.push('');
newLines.push('  return (');
newLines.push('    <ShopContext.Provider');
newLines.push('      value={{');
for (const name of contextExports) {
  newLines.push('        ' + name + ',');
}

newLines.push(`        addCoupon: (coupon) => {
          const updated = [...coupons, coupon];
        },
        addBlogPost: (post) => {
          const updated = [post, ...blogPosts];
          setBlogPosts(updated);
          localStorage.setItem('chronex_blog', JSON.stringify(updated));
        },
        deleteBlogPost: (id) => {
          const updated = blogPosts.filter(p => p.id !== id);
          setBlogPosts(updated);
          localStorage.setItem('chronex_blog', JSON.stringify(updated));
        },
        changeLanguage: (lang) => {
          setLanguage(lang);
          localStorage.setItem('chronex_language', lang);
        },
        changeTheme: (newTheme) => {
          setTheme(newTheme);
          localStorage.setItem('chronex_theme', newTheme);
        },
        changeFontSize: (size) => {
          setFontSize(size);
          localStorage.setItem('chronex_fontsize', size);
        },
        changeHighContrast: (contrast) => {
          setHighContrast(contrast);
          localStorage.setItem('chronex_contrast', contrast);
        },
        generateReferralCode: () => {
          if (!currentUser) return;
        },
        cancelSubscription: () => {
          if (!currentUser || !subscription) return;
          const updatedSub = { ...subscription, status: 'Cancelled' };
          setSubscription(updatedSub);
          localStorage.setItem(\`chronex_sub_\${currentUser.email}\`, JSON.stringify(updatedSub));
        },
        submitCorporateInquiry: (inquiry) => {
          const newInquiry = { ...inquiry, id: \`CORP-\${Math.floor(10000 + Math.random()*90000)}\`, date: new Date().toISOString(), status: 'Pending' };
          const updated = [newInquiry, ...corporateInquiries];
          setCorporateInquiries(updated);
          localStorage.setItem('chronex_corporate_inquiries', JSON.stringify(updated));
        }`);

newLines.push('      }}');
newLines.push('    >');
newLines.push('      {children}');
newLines.push('    </ShopContext.Provider>');
newLines.push('  );');
newLines.push('};');
newLines.push('');
newLines.push('export default ShopProvider;');

fs.writeFileSync('src/context/ShopContext.jsx', newLines.join('\n'));
console.log('Restoration algorithm completed successfully!');
