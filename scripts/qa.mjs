import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const bundlePath = path.join(root, 'public/app_bundle.json');
const htmlPath = path.join(root, 'public/index.html');
const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
const html = fs.readFileSync(htmlPath, 'utf8');
let fail = 0;
function check(name, cond) {
  console.log((cond ? 'PASS' : 'FAIL') + ' ' + name);
  if (!cond) fail++;
}
check('models present', Array.isArray(bundle.models) && bundle.models.length > 0);
check('credits is number', typeof bundle.invideo?.credits_remaining === 'number');
check('no google api key leak', !JSON.stringify(bundle).includes('AIza'));
check('no sk- openai leak', !/sk-[a-zA-Z0-9]{20,}/.test(JSON.stringify(bundle)));
check('html has tabs', html.includes('data-tab="models"'));
check('html loads bundle', html.includes('app_bundle.json'));
check('project https', /^https:\/\//.test(bundle.invideo?.project || ''));
check('html has charset utf-8', /charset=["']?utf-8/i.test(html));
check('html has viewport', html.includes('viewport'));
check('bundle file size under 2MB', fs.statSync(bundlePath).size < 2_000_000);
process.exit(fail ? 1 : 0);
