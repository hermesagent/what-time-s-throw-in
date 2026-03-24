# What Time's Throw In? ☘️

**Irish Sports TV Schedule & Broadcast Guide**

A single-page, self-contained web tool that displays upcoming Irish sports fixture start times alongside their broadcast channels and streaming services. Built for fans who want a quick, at-a-glance view of what's on and where to watch — with a focus on weekend fixtures.

---

## What the Application Does

**What Time's Throw In?** is a lightweight, static HTML web application that helps Irish sports fans quickly find out:

- **When** their favourite sports events kick off
- **Where** to watch them — TV channel or streaming service

The tool covers the **five core Irish-interest sports**:

| Sport | Examples |
|-------|----------|
| 🏉 Rugby | Six Nations, Heineken Champions Cup, URC |
| ⚽ Soccer | League of Ireland, FAI Cup, Champions League |
| 🏐 GAA | Hurling & Football – provincial and national fixtures |
| ⛳ Golf | The Masters, Irish Open |
| 🐎 Horse Racing | Cheltenham, Leopardstown, Fairyhouse |

### Key Features

- **Fixture cards** — each card shows the sport (colour-coded), event/match name, date & kick-off time (Irish time), and a channel badge for where to watch
- **Weekend-first** — opens with the "Weekend Only" toggle enabled so Saturday & Sunday fixtures are front and centre
- **Sport filter** — tap any sport pill to narrow results; tap "All Sports" to reset
- **Day filter** — view all days, Saturday only, or Sunday only
- **Fully responsive** — works on mobile (320 px+), tablet, and desktop with an adaptive grid layout
- **Accessible** — ARIA roles, `aria-pressed` states, live regions, and 44 px minimum touch targets throughout
- **On-page instructions** — visible usage guide so visitors immediately know what to do
- **Zero dependencies** — no CDN links, no API calls, no frameworks; works completely offline

---

## Prerequisites

- **Any modern web browser** — Chrome, Firefox, Safari, Edge, or equivalent

That's it. The application is a **single static HTML file** with all CSS and JavaScript inlined. There is no server, runtime, database, build step, or package manager required.

**Optional** (only needed to run the test suite):
- **Node.js** v14 or later — to execute the acceptance-criteria validation tests

---

## Installation

### Option A — Clone with Git

```bash
git clone <repository-url>
cd <project-directory>
```

No `npm install` or build step is required. The application is ready to use immediately.

### Option B — Download a ZIP

Download and extract the repository ZIP from your Git host. The single application file is `index.html` at the project root.

---

## How to Run the Application

### Option 1 — Open directly in a browser (simplest)

Double-click, or open via **File → Open** in your browser:

```
index.html
```

The tool renders immediately. No server needed.

### Option 2 — Serve via a local HTTP server

If you want to serve the file at a URL path (useful for testing responsive layouts or sharing on a LAN):

```bash
# Python 3
python3 -m http.server 8000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 3 — Docker (nginx)

A `Dockerfile` is included at the project root. It serves the application with nginx on port 80.

```bash
# Build the image
docker build -t whats-throw-in .

# Run the container
docker run -p 8080:80 whats-throw-in
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

### Option 4 — Deploy as a static file

Upload `index.html` to any static hosting provider — GitHub Pages, Netlify, Vercel, Amazon S3, Cloudflare Pages, etc. No server-side runtime is required. The file works correctly when served at a path URL.

---

## How to Use the Tool

Once the page is open:

1. **Filter by sport** — tap a sport pill button (Rugby, Soccer, GAA, Golf, Horse Racing) to show only that sport's fixtures. Tap **All Sports** to see everything.
2. **Weekend Only toggle** — enabled by default. Shows only Saturday & Sunday fixtures. Toggle it off to see the full week.
3. **Filter by day** — select **Saturday**, **Sunday**, or **All Days** to narrow by a specific day.
4. **Read fixture cards** — each card shows the sport (colour-coded), match/event name, kick-off time in Irish Standard Time, and a green channel badge for where to watch.

On-page usage instructions are permanently visible at the bottom of the page so new visitors can immediately orientate themselves.

---

## How to Run the Tests

The project includes an acceptance-criteria validation suite that verifies the HTML file meets all product requirements. The tests use **Node.js built-ins only** — no test framework or `npm install` required.

### Run the test suite

```bash
# From the project root
node src/tests/validate.test.cjs
```

### Expected output

```
============================================================
  ACCEPTANCE CRITERIA VALIDATION RESULTS
============================================================

  ✅ [PASS] C1: Starts with <!DOCTYPE html>
  ✅ [PASS] C2: Fixture data contains at least one "rugby" entry
  ... (all tests)

  Total: 98 tests
  Passed: 98
  Failed: 0
============================================================
```

Results are also written to `test-results/validate-results.txt`.

### What the tests cover

| Criteria | What's Checked |
|----------|----------------|
| **C1** | Valid HTML structure — DOCTYPE, `<html lang>`, `<head>`, `<body>`, charset meta, `<title>` |
| **C2** | All five sports represented with ≥ 2 fixtures each; filter pills present for each sport |
| **C3** | Every fixture object has `sport`, `name`, `date`, `time`, `channel`, and `day` fields; ≥ 10 fixtures total |
| **C4** | Weekend Only toggle present; ≥ 3 fixtures per weekend day; Saturday/Sunday filter buttons present |
| **C5** | Responsive design — viewport meta tag, CSS media queries, grid layouts, 44 px touch targets |
| **C6** | On-page instructions visible and reference key UI elements (toggle, sport filter, day filter, cards) |
| **C7** | No external dependencies — no CDN URLs, no `fetch()` calls, no external scripts or stylesheets |
| **C8** | Single file with inline `<style>` and `<script>` only |
| **Bonus** | ARIA accessibility attributes, colour-coded sports, Irish broadcast channels present |

---

## Configuration Options

All configuration is done by editing `index.html` directly. There is no config file, environment variable, or build step.

### Updating Fixture Data

Fixture data is embedded as a JavaScript array in the `<script>` block. Each fixture is a plain object:

```javascript
{
  sport:       "rugby",                         // "rugby" | "soccer" | "gaa" | "golf" | "racing"
  name:        "Ireland vs Wales – Six Nations", // Event or match name
  date:        "2026-03-28",                    // YYYY-MM-DD
  time:        "14:15",                         // HH:MM, 24-hour Irish time
  day:         "Saturday",                      // Day of week (used for weekend filter)
  channel:     "RTÉ 2",                         // Primary broadcast channel or streaming service
  channelNote: "Also on RTÉ Player"             // Optional secondary note ("" for none)
}
```

Edit the `fixtures` array in the `<script>` section and save the file. The application automatically sorts fixtures by date and then by kick-off time.

### Supported Sports

The five sport identifiers, their display names, and colour-coding:

| Identifier | Display Name | Accent Colour |
|-----------|-------------|---------------|
| `rugby` | Rugby | `#006847` (Irish Green) |
| `soccer` | Soccer | `#1565c0` (Blue) |
| `gaa` | GAA | `#ff8f00` (Amber) |
| `golf` | Golf | `#2e7d32` (Forest Green) |
| `racing` | Horse Racing | `#6a1b9a` (Purple) |

### Styling

All CSS is in the `<style>` block in `index.html`. Key responsive breakpoints:

| Breakpoint | Behaviour |
|-----------|-----------|
| `≤ 374 px` | Small-mobile tweaks — slightly smaller fonts and compact pill buttons |
| `≥ 700 px` | Two-column fixture grid on tablet/desktop |
| `≥ 1024 px` | Horizontal card layout on large desktop screens |

### Default Behaviour

| Setting | Default |
|---------|---------|
| Weekend Only toggle | **ON** — only Saturday & Sunday fixtures shown on load |
| Sport filter | **All Sports** selected |
| Day filter | **All Days** selected |
| Sort order | Chronological — by date, then by kick-off time |

---

## Project Structure

```
├── index.html                  # ★ The complete application (open this in your browser)
├── Dockerfile                  # nginx container for deployment
├── src/
│   ├── index.html              # Development source copy
│   └── tests/
│       └── validate.test.cjs   # Acceptance criteria test suite (Node.js)
├── test-results/
│   └── validate-results.txt    # Latest test run output
├── artifacts/                  # Project planning documents
│   ├── charter_v1.json
│   ├── domain_context_v1.json
│   ├── prd_v1.json / prd_v2.json
│   ├── ux_spec_v1.json
│   └── task_plan_v1.json
├── infra/                      # Infrastructure configuration
└── README.md                   # This file
```

> **Note:** The primary application file is `index.html` at the **project root**. The `src/index.html` is the development source; the test suite reads from `src/index.html`.

---

## Browser Compatibility

Tested and functional on all modern browsers:

- Google Chrome / Chromium 90+
- Mozilla Firefox 88+
- Apple Safari 14+ (macOS & iOS)
- Microsoft Edge 90+

No polyfills or transpilation required. JavaScript uses broadly compatible patterns.

---

## Architecture Notes

- **Data:** All fixture data is embedded/static (no live API integrations in v1.0). Update the `fixtures` array in `index.html` to refresh data.
- **No server-side runtime:** The tool functions as a static file served at any path URL. No backend, authentication, or database is used.
- **Offline-capable:** Because there are zero external dependencies, the page works with no internet connection once loaded.
- **Self-contained:** A single `index.html` file is the entire application — inline CSS, inline JavaScript, and data all in one place.

---

## License

© 2026. Sample fixture data is for demonstration purposes only.

---

*Built by [HermesOrg](https://hermesforge.dev/org) — an orchestration of distinct AI personas working in concert. Product Manager → Designer → Engineer → QA, each contributing expertise to build something real.*
