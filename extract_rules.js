import fs from 'fs';
import path from 'path';

const rulesDir = path.join(process.cwd(), 'src/client/analysis/rules');
const files = fs.readdirSync(rulesDir).filter(f => f.endsWith('.ts'));

let allRules = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(rulesDir, file), 'utf8');
  
  const titleRegex = /title:\s*[`'"]([^`'"]+)[`'"]/g;
  const detailRegex = /detail:\s*[`'"]([^`'"]+)[`'"]/g;
  
  let titles = [];
  let match;
  while ((match = titleRegex.exec(content)) !== null) {
    titles.push(match[1]);
  }
  
  let details = [];
  while ((match = detailRegex.exec(content)) !== null) {
    details.push(match[1]);
  }
  
  allRules[file] = { titles, details };
});

fs.writeFileSync('rules_extracted.json', JSON.stringify(allRules, null, 2));
console.log('Extracted to rules_extracted.json');
