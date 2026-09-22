// One-off migration script: writes src/data/siteContent.json from today's
// seed data, so the file that admin saves will commit to starts out
// identical to what every visitor currently sees.
//
// Run with: node scripts/generate-seed-content.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { seedAll } from '../src/data/seedAdminContent.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/data/siteContent.json');

const content = seedAll();
content._meta = { updatedAt: new Date().toISOString() };

writeFileSync(outPath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
console.log('Wrote ' + outPath);
