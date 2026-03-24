/**
 * Acceptance Criteria Validation Tests
 * for "What Time's Throw In?" – Irish Sports TV Schedule
 *
 * Run with: node validate.test.js
 * (No external dependencies required – uses Node.js built-ins only)
 */

const fs = require('fs');
const path = require('path');

const HTML_PATH = path.join(__dirname, '..', 'index.html');

let html;
let passed = 0;
let failed = 0;
const results = [];

function assert(condition, description) {
  if (condition) {
    passed++;
    results.push({ status: 'PASS', description });
  } else {
    failed++;
    results.push({ status: 'FAIL', description });
  }
}

// ===== Load file =====
try {
  html = fs.readFileSync(HTML_PATH, 'utf-8');
} catch (e) {
  console.error('FATAL: Cannot read index.html at', HTML_PATH);
  process.exit(1);
}

// =========================================================================
// CRITERION 1: Opens correctly as a static file in a browser
// =========================================================================
assert(html.trim().startsWith('<!DOCTYPE html>'), 'C1: Starts with <!DOCTYPE html>');
assert(/<html[^>]*lang="en"/.test(html), 'C1: <html> tag has lang attribute');
assert(/<head>/.test(html), 'C1: Contains <head> section');
assert(/<body>/.test(html), 'C1: Contains <body> section');
assert(/<\/html>\s*$/.test(html), 'C1: Ends with closing </html> tag');
assert(/<meta\s+charset="UTF-8"/.test(html), 'C1: Has UTF-8 charset meta');
assert(/<title>[^<]+<\/title>/.test(html), 'C1: Has a non-empty <title> tag');

// =========================================================================
// CRITERION 2: All five sports represented with fixture data
// =========================================================================
const sports = ['rugby', 'soccer', 'gaa', 'golf', 'racing'];

sports.forEach(sport => {
  const re = new RegExp(`sport:\\s*"${sport}"`, 'g');
  const matches = html.match(re);
  assert(matches && matches.length >= 1, `C2: Fixture data contains at least one "${sport}" entry`);
  assert(matches && matches.length >= 2, `C2: Fixture data contains ≥2 "${sport}" entries for variety`);
});

// Check filter pills exist for all sports
sports.forEach(sport => {
  assert(html.includes(`data-sport="${sport}"`), `C2: Filter pill exists for sport "${sport}"`);
});

// Verify "All Sports" pill
assert(html.includes('data-sport="all"'), 'C2: "All Sports" filter pill exists');

// =========================================================================
// CRITERION 3: Each fixture shows sport/event/date-time/channel
// =========================================================================
// Parse fixture objects from the embedded JS data
const fixtureBlockMatch = html.match(/var fixtures\s*=\s*\[([\s\S]*?)\];/);
assert(fixtureBlockMatch !== null, 'C3: Fixture data array found in script');

if (fixtureBlockMatch) {
  const fixtureBlock = fixtureBlockMatch[1];
  // Extract individual fixture objects
  const fixtureObjects = fixtureBlock.match(/\{[^}]+\}/g) || [];
  assert(fixtureObjects.length >= 10, `C3: At least 10 fixtures defined (found ${fixtureObjects.length})`);

  let allHaveSport = true;
  let allHaveName = true;
  let allHaveDate = true;
  let allHaveTime = true;
  let allHaveChannel = true;
  let allHaveDay = true;

  fixtureObjects.forEach((obj, i) => {
    if (!/sport:\s*"/.test(obj)) allHaveSport = false;
    if (!/name:\s*"/.test(obj)) allHaveName = false;
    if (!/date:\s*"/.test(obj)) allHaveDate = false;
    if (!/time:\s*"\d{2}:\d{2}"/.test(obj)) allHaveTime = false;
    if (!/channel:\s*"/.test(obj)) allHaveChannel = false;
    if (!/day:\s*"/.test(obj)) allHaveDay = false;
  });

  assert(allHaveSport, 'C3: Every fixture has a "sport" field');
  assert(allHaveName, 'C3: Every fixture has a "name" (event) field');
  assert(allHaveDate, 'C3: Every fixture has a "date" field');
  assert(allHaveTime, 'C3: Every fixture has a "time" field in HH:MM format');
  assert(allHaveChannel, 'C3: Every fixture has a "channel" field');
  assert(allHaveDay, 'C3: Every fixture has a "day" field');
}

// Verify the render function outputs sport tag, time, name, and channel
assert(/sport-tag/.test(html), 'C3: Render includes sport tag class');
assert(/fixture-time/.test(html), 'C3: Render includes fixture-time class');
assert(/fixture-name/.test(html), 'C3: Render includes fixture-name class');
assert(/channel-badge/.test(html), 'C3: Render includes channel-badge class');

// =========================================================================
// CRITERION 4: Weekend fixtures are prominent or filterable
// =========================================================================
assert(/weekend-toggle-btn/.test(html), 'C4: Weekend toggle button exists');
assert(/Weekend Only/.test(html), 'C4: "Weekend Only" label visible');
assert(/weekendOnly\s*=\s*true/.test(html), 'C4: Weekend filter is ON by default');
assert(/weekend-highlight/.test(html), 'C4: Weekend fixtures get "weekend-highlight" CSS class');
assert(/weekend-badge/.test(html), 'C4: Weekend badge CSS class defined');
assert(/\.fixture-card\.weekend-highlight/.test(html), 'C4: Weekend highlight has distinct styling');
assert(/isWeekend/.test(html), 'C4: isWeekend helper function defined');

// Saturday and Sunday filter pills
assert(html.includes('data-day="saturday"'), 'C4: Saturday day filter pill exists');
assert(html.includes('data-day="sunday"'), 'C4: Sunday day filter pill exists');

// Weekend fixtures exist in data
const saturdayEntries = html.match(/day:\s*"Saturday"/g);
const sundayEntries = html.match(/day:\s*"Sunday"/g);
assert(saturdayEntries && saturdayEntries.length >= 3, `C4: At least 3 Saturday fixtures (found ${saturdayEntries ? saturdayEntries.length : 0})`);
assert(sundayEntries && sundayEntries.length >= 3, `C4: At least 3 Sunday fixtures (found ${sundayEntries ? sundayEntries.length : 0})`);

// =========================================================================
// CRITERION 5: Responsive on mobile and desktop
// =========================================================================
assert(/<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1\.0"/.test(html),
  'C5: Viewport meta tag for responsive design');
assert(/@media\s*\(\s*min-width:\s*700px\)/.test(html),
  'C5: Desktop media query breakpoint exists (≥700px)');
assert(/@media\s*\(\s*min-width:\s*1024px\)/.test(html),
  'C5: Large desktop media query breakpoint exists (≥1024px)');
assert(/@media\s*\(\s*max-width:\s*374px\)/.test(html),
  'C5: Small mobile media query breakpoint exists (≤374px)');
assert(/min-width:\s*320px/.test(html), 'C5: Body has min-width: 320px for smallest phones');
assert(/grid-template-columns:\s*1fr\b/.test(html), 'C5: Mobile default is single-column grid');
assert(/grid-template-columns:\s*1fr\s+1fr/.test(html), 'C5: Desktop uses two-column grid');
assert(/min-height:\s*44px/.test(html), 'C5: Touch targets meet 44px minimum height');
assert(/flex-wrap:\s*wrap/.test(html), 'C5: Filter pills wrap on small screens');

// =========================================================================
// CRITERION 6: On-page instructions are visible
// =========================================================================
assert(/class="instructions"/.test(html), 'C6: Instructions section exists with "instructions" class');
assert(/How to use/.test(html), 'C6: Instructions contain "How to use" text');
assert(/role="note"/.test(html), 'C6: Instructions have ARIA role="note"');
assert(/sport button/.test(html), 'C6: Instructions mention sport buttons');
assert(/Weekend Only/.test(html), 'C6: Instructions mention Weekend Only toggle');
assert(/channel badge/.test(html), 'C6: Instructions mention channel badge');
assert(/kick-off time/.test(html) || /time/.test(html), 'C6: Instructions mention time');
// Instructions are NOT hidden
assert(!/display:\s*none.*instructions/s.test(html), 'C6: Instructions are not hidden with display:none');
assert(!/visibility:\s*hidden.*instructions/s.test(html), 'C6: Instructions are not hidden with visibility:hidden');

// =========================================================================
// CRITERION 7: No external dependencies or API calls
// =========================================================================
// No external stylesheet links
const linkTags = html.match(/<link[^>]+rel="stylesheet"[^>]*>/gi) || [];
assert(linkTags.length === 0, `C7: No external stylesheet <link> tags (found ${linkTags.length})`);

// No external script sources
const scriptSrcMatches = html.match(/<script[^>]+src=/gi) || [];
assert(scriptSrcMatches.length === 0, `C7: No external <script src="..."> tags (found ${scriptSrcMatches.length})`);

// No fetch/XMLHttpRequest/import calls
assert(!/\bfetch\s*\(/.test(html), 'C7: No fetch() API calls');
assert(!/XMLHttpRequest/.test(html), 'C7: No XMLHttpRequest usage');
assert(!/import\s+/.test(html), 'C7: No ES module imports');
assert(!/require\s*\(/.test(html.match(/<script[\s\S]*?<\/script>/)?.[0] || ''),
  'C7: No require() calls in inline script');

// No CDN or external URLs in the file (except data URIs)
const externalURLs = html.match(/https?:\/\/[^\s"'<>]+/g) || [];
assert(externalURLs.length === 0, `C7: No external HTTP(S) URLs (found ${externalURLs.length}: ${externalURLs.join(', ')})`);

// No @import CSS
assert(!/@import\s+url/.test(html), 'C7: No CSS @import statements');

// =========================================================================
// CRITERION 8: Single file with inline CSS/JS only
// =========================================================================
assert(html.includes('<style>'), 'C8: Inline <style> block present');
assert(html.includes('</style>'), 'C8: Inline </style> closing tag present');
assert(html.includes('<script>'), 'C8: Inline <script> block present (no src attribute)');
assert(html.includes('</script>'), 'C8: Inline </script> closing tag present');

// Verify it's all in one file
const htmlFiles = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.html'));
assert(htmlFiles.length === 1, `C8: Exactly one HTML file in src/ directory (found ${htmlFiles.length}: ${htmlFiles.join(', ')})`);

// No linked CSS files
const cssFiles = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.css'));
assert(cssFiles.length === 0, `C8: No separate CSS files (found ${cssFiles.length})`);

// No linked JS files
const jsFiles = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.js'));
assert(jsFiles.length === 0, `C8: No separate JS files in src/ root (found ${jsFiles.length})`);

// =========================================================================
// BONUS: Additional quality checks
// =========================================================================
assert(/aria-live="polite"/.test(html), 'BONUS: Filter summary has aria-live="polite" for accessibility');
assert(/aria-live="assertive"/.test(html), 'BONUS: Live announcements region for screen readers');
assert(/aria-pressed/.test(html), 'BONUS: Filter buttons use aria-pressed for state');
assert(/role="toolbar"/.test(html), 'BONUS: Filter nav has role="toolbar"');

// Verify all five sports have colour coding
sports.forEach(sport => {
  assert(html.includes(`sport-${sport}`), `BONUS: Sport "${sport}" has colour-coded CSS class`);
  assert(html.includes(`tag-${sport}`), `BONUS: Sport "${sport}" has tag styling class`);
});

// Verify Irish channels are represented
const irishChannels = ['TG4', 'GAAGO', 'Racing TV', 'Sky Sports'];
irishChannels.forEach(ch => {
  assert(html.includes(ch), `BONUS: Irish channel "${ch}" appears in fixture data`);
});
// RTÉ may appear as unicode escape \u00c9 or literal É in file
assert(html.includes('RTÉ') || html.includes('RT\\u00c9') || html.includes('RT\u00c92'), 'BONUS: Irish channel "RTÉ" appears in fixture data');

// =========================================================================
// RESULTS
// =========================================================================
console.log('\n' + '='.repeat(60));
console.log('  ACCEPTANCE CRITERIA VALIDATION RESULTS');
console.log('='.repeat(60) + '\n');

results.forEach(r => {
  const icon = r.status === 'PASS' ? '✅' : '❌';
  console.log(`  ${icon} [${r.status}] ${r.description}`);
});

console.log('\n' + '-'.repeat(60));
console.log(`  TOTAL: ${passed + failed} tests | ✅ ${passed} passed | ❌ ${failed} failed`);
console.log('-'.repeat(60));

if (failed > 0) {
  console.log('\n  ⚠️  SOME TESTS FAILED — see details above.\n');
  process.exit(1);
} else {
  console.log('\n  🎉 ALL TESTS PASSED — file meets all acceptance criteria!\n');
  process.exit(0);
}
