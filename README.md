# What Time's Throw In? ☘️

**Irish Sports TV Schedule & Broadcast Guide**

A single-page, self-contained web tool that displays upcoming Irish sports fixture start times alongside their broadcast channels and streaming services. Built for fans who want a quick, at-a-glance view of what's on and where to watch — with a focus on weekend fixtures.

## What It Does

- Displays fixture cards for **five core Irish-interest sports**: Rugby, Soccer, GAA (Hurling & Football), Golf, and Horse Racing
- Each fixture card shows the **sport**, **event/match name**, **date & kick-off time** (Irish time), and the **TV channel or streaming service**
- **Weekend-first filtering**: opens with the "Weekend Only" toggle enabled so Saturday & Sunday fixtures are front and centre
- **Sport filtering**: tap any sport pill button to narrow results to a single sport, or select "All Sports"
- **Day filtering**: filter by a specific day (Saturday, Sunday) or view all days
- Fully **responsive** — works on mobile (320px+), tablet, and desktop with adaptive grid layouts
- **Accessible** — uses ARIA roles, `aria-pressed` states, live regions for screen readers, and 44px minimum touch targets
- Includes **on-page usage instructions** so visitors can immediately understand how to use the tool
- **Zero external dependencies** — no CDN links, no API calls, no frameworks. Works entirely offline

## Prerequisites

- **Any modern web browser** (Chrome, Firefox, Safari, Edge, or equivalent)
- No server, runtime, database, or build tools required

That's it. The application is a single static HTML file with all CSS and JavaScript inlined.

## Installation

1. **Clone or download** this repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. There are no dependencies to install. No `npm install`, no build step.

## How to Run the Application

### Option 1: Open directly in a browser

Double-click (or open) the file:

```
src/index.html
```

The tool will render immediately in your browser — no server required.

### Option 2: Serve via a local HTTP server

If you prefer to serve it at a URL path (e.g. for testing or deployment):

```bash
# Using Python 3
python3 -m http.server 8000 --directory src

# Using Node.js (npx)
npx serve src

# Using PHP
php -S localhost:8000 -t src
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 3: Deploy as a static file

Upload `src/index.html` to any static hosting provider (GitHub Pages, Netlify, Vercel, S3, etc.). No server-side runtime is needed.

## How to Use the Tool

Once the page is open:

1. **Filter by sport** — Tap a sport pill button (Rugby, Soccer, GAA, Golf, Horse Racing) to show only that sport's fixtures. Tap "All Sports" to see everything.
2. **Weekend Only toggle** — Enabled by default. Shows only Saturday & Sunday fixtures. Toggle it off to see all days.
3. **Filter by day** — Select "Saturday", "Sunday", or "All Days" to narrow by specific day.
4. **Read fixture cards** — Each card displays the sport (colour-coded), match/event name, kick-off time in IST, and a green channel badge showing where to watch.

## How to Run the Tests

The project includes an acceptance criteria validation suite that verifies the HTML file meets all requirements. The tests use **Node.js built-ins only** (no external test frameworks).

```bash
# From the project root
node src/tests/validate.test.cjs
```

**Expected output:** 98 tests, all passing. The tests validate:

| Criteria | What's Checked |
|----------|---------------|
| C1 | Valid HTML structure (DOCTYPE, head, body, charset, title) |
| C2 | All five sports represented with ≥2 fixtures each; filter pills exist |
| C3 | Every fixture has sport, name, date, time, channel, and day fields |
| C4 | Weekend toggle, weekend highlighting, Saturday/Sunday filters, ≥3 fixtures per weekend day |
| C5 | Responsive design (viewport meta, media queries, grid layouts, 44px touch targets) |
| C6 | On-page instructions are present, visible, and mention key UI elements |
| C7 | No external dependencies (no CDN links, fetch calls, external scripts/stylesheets) |
| C8 | Single file with inline CSS and JS only |
| Bonus | Accessibility (ARIA attributes), colour-coded sports, Irish broadcast channels |

## Configuration Options

### Updating Fixture Data

Fixture data is embedded directly in the `<script>` block of `src/index.html`. Each fixture is a JavaScript object in the `fixtures` array:

```javascript
{
  sport: "rugby",           // One of: "rugby", "soccer", "gaa", "golf", "racing"
  name: "Ireland vs Wales – Six Nations",  // Event/match name
  date: "2026-03-28",       // Date in YYYY-MM-DD format
  time: "14:15",            // Kick-off time in HH:MM (24-hour, Irish time)
  day: "Saturday",          // Day of the week
  channel: "RTÉ 2",        // Primary broadcast channel or streaming service
  channelNote: "Also on RTÉ Player"  // Optional secondary note (leave empty string if none)
}
```

To update fixtures, edit the `fixtures` array in the `<script>` section of `src/index.html`. The application automatically sorts fixtures by date and time and groups them by day.

### Supported Sports

The five supported sport identifiers and their display properties are:

| Identifier | Display Name | Colour |
|-----------|-------------|--------|
| `rugby` | Rugby | Green (#006847) |
| `soccer` | Soccer | Blue (#1565c0) |
| `gaa` | GAA | Orange (#ff8f00) |
| `golf` | Golf | Forest Green (#2e7d32) |
| `racing` | Horse Racing | Purple (#6a1b9a) |

### Styling

All CSS is inlined in the `<style>` block. Key responsive breakpoints:

- **≤374px** — Small mobile adjustments (smaller fonts, compact pill buttons)
- **≥700px** — Desktop two-column fixture grid
- **≥1024px** — Large desktop with horizontal card layout

### Default Behaviour

- The **Weekend Only** toggle is **ON** by default, showing only Saturday & Sunday fixtures
- The **All Sports** filter is selected by default
- Fixtures are sorted chronologically by date, then by kick-off time

## Project Structure

```
├── src/
│   ├── index.html              # The complete application (single file)
│   └── tests/
│       └── validate.test.cjs   # Acceptance criteria test suite
├── test-results/
│   └── validate-results.txt    # Latest test run output
├── artifacts/                  # Project planning documents
├── infra/                      # Infrastructure configuration
└── README.md                   # This file
```

## Browser Compatibility

Tested and works on all modern browsers:

- Google Chrome / Chromium
- Mozilla Firefox
- Apple Safari (macOS & iOS)
- Microsoft Edge

No polyfills or transpilation needed. The JavaScript uses ES5-compatible patterns for broad compatibility.

## License

© 2026. Sample fixture data is for demonstration purposes only.

---

*Built by [HermesOrg](https://hermesforge.dev/org) — an orchestration of distinct AI personas working in concert. Product Manager → Designer → Engineer → QA, each contributing expertise to build something real.*
