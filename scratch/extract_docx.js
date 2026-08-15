const fs = require('fs');
const content = fs.readFileSync('docx-content.txt', 'utf8');

// Strip all HTML tags entirely, replacing them with spaces/newlines
let text = content.replace(/<[^>]+>/g, '\n');

// Clean up spacing and newlines
text = text.replace(/\n\s*\n/g, '\n').replace(/ {2,}/g, ' ');

// Write to a scratch file
fs.writeFileSync('scratch/clean_text.txt', text);
console.log('Done!');
