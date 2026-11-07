import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const bundle = JSON.parse(fs.readFileSync(path.join(root, 'public/app_bundle.json'), 'utf8'));
const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
let fail = 0;
function check(name, cond) {
  console.log((cond ? 'PASS' : 'FAIL') + ' ' + name);
  if (!cond) fail++;
}
check('models present', bundle.models?.length > 0);
check('credits is number', typeof bundle.invideo.credits_remaining === 'number');
check('no google api key leak', !JSON.stringify(bundle).includes('AIza'));
check('html has tabs', html.includes('data-tab="models"'));
check('html loads bundle', html.includes('app_bundle.json'));
check('project https', /^https:\/\//.test(bundle.invideo.project));
process.exit(fail ? 1 : 0);
