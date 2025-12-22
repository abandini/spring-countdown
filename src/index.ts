import { Hono } from 'hono';
import { getCountdowns, getDaylightInfo, getDaylightGain, getSpringProgress } from './utils/sun';
import { getMoonInfo, formatMoonTimes } from './utils/moon';
import { getVisibleConstellations } from './data/constellations';
import { getDailySkyLore, getUpcomingEvents } from './data/sky-lore';

// Type definitions for Cloudflare bindings
export interface Env {
  DB: D1Database;
  KV: KVNamespace;
  STORAGE: R2Bucket;
  AI: Ai;
  ENVIRONMENT: string;
  SPRING_EQUINOX: string;
  DST_START: string;
}

const app = new Hono<{ Bindings: Env }>();

// Default location (NYC) - will be overridden by user location
const DEFAULT_LAT = 40.7128;
const DEFAULT_LON = -74.006;

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API: Get all data
app.get('/api/data', (c) => {
  const url = new URL(c.req.url);
  const lat = parseFloat(url.searchParams.get('lat') || String(DEFAULT_LAT));
  const lon = parseFloat(url.searchParams.get('lon') || String(DEFAULT_LON));
  const timezone = url.searchParams.get('tz') || 'America/New_York';

  const now = new Date();

  // Get all the data
  const countdowns = getCountdowns(now);
  const daylight = getDaylightInfo(now, lat, lon, timezone);
  const daylightGain = getDaylightGain(now, lat, lon);
  const springProgress = getSpringProgress(now, lat, lon);
  const moon = getMoonInfo(now, lat, lon);
  const moonTimes = formatMoonTimes(moon.times, timezone);
  const constellations = getVisibleConstellations(now, lat, lon).slice(0, 5);
  const skyLore = getDailySkyLore(now);
  const upcomingEvents = getUpcomingEvents(now, 3);

  return c.json({
    timestamp: now.toISOString(),
    location: { lat, lon, timezone },
    countdowns,
    daylight,
    daylightGain,
    springProgress,
    moon: {
      ...moon,
      times: moonTimes
    },
    constellations,
    skyLore,
    upcomingEvents
  });
});

// API: Countdown only (for frequent updates)
app.get('/api/countdown', (c) => {
  const countdowns = getCountdowns();
  return c.json(countdowns);
});

// Main app
app.get('/', (c) => {
  return c.html(renderHTML());
});

// Service worker
app.get('/sw.js', async (c) => {
  const sw = `
const CACHE_NAME = 'spring-v1';
self.addEventListener('install', e => e.waitUntil(self.skipWaiting()));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.url.includes('/api/')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
`;
  return c.text(sw, 200, { 'Content-Type': 'application/javascript' });
});

// Manifest
app.get('/manifest.json', (c) => {
  return c.json({
    name: 'Spring Countdown',
    short_name: 'Spring',
    description: 'Count down to spring and explore the night sky',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#f59e0b',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }
    ]
  });
});

// SVG Icon
app.get('/icon.svg', (c) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill="#f59e0b"/>
    <circle cx="50" cy="50" r="30" fill="#fbbf24"/>
    <g fill="#fef3c7">
      ${[0,45,90,135,180,225,270,315].map(angle =>
        `<ellipse cx="50" cy="15" rx="3" ry="10" transform="rotate(${angle} 50 50)"/>`
      ).join('')}
    </g>
  </svg>`;
  return c.text(svg, 200, { 'Content-Type': 'image/svg+xml' });
});

function renderHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#f59e0b">
  <meta name="description" content="Count down to spring, track the growing daylight, and explore tonight's sky">
  <meta property="og:title" content="Spring Countdown - The Days Are Getting Longer">
  <meta property="og:description" content="Celebrate the return of longer days with astronomy, moon phases, and celestial wisdom">
  <title>Spring Countdown</title>
  <link rel="manifest" href="/manifest.json">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      /* Warm sunrise palette */
      --gold: #f59e0b;
      --amber: #d97706;
      --orange: #ea580c;
      --coral: #f87171;
      --peach: #fef3c7;
      --cream: #fffbeb;

      /* Night sky palette */
      --night: #0f172a;
      --navy: #1e293b;
      --slate: #334155;
      --mist: #94a3b8;

      /* Spring palette */
      --spring: #84cc16;
      --mint: #a7f3d0;
      --sky: #7dd3fc;

      /* Gradients */
      --gradient-sky: linear-gradient(180deg, var(--navy) 0%, var(--slate) 50%, var(--amber) 90%, var(--gold) 100%);
      --gradient-card: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);

      --font-display: 'Fraunces', Georgia, serif;
      --font-body: 'Outfit', system-ui, sans-serif;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: var(--font-body);
      background: var(--night);
      color: var(--cream);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.6;
    }

    /* Starfield background */
    .stars {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      animation: twinkle 3s infinite;
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }

    /* Main container */
    .container {
      position: relative;
      z-index: 1;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    /* Header with sun animation */
    header {
      text-align: center;
      padding: 2rem 0 3rem;
      position: relative;
    }

    .sun-container {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto 1.5rem;
    }

    .sun {
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, var(--gold) 0%, var(--amber) 60%, var(--orange) 100%);
      border-radius: 50%;
      box-shadow:
        0 0 60px var(--gold),
        0 0 100px rgba(245, 158, 11, 0.5);
      animation: pulse 4s ease-in-out infinite;
    }

    .sun-rays {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 160px;
      height: 160px;
      margin: -80px 0 0 -80px;
      animation: rotate 30s linear infinite;
    }

    .ray {
      position: absolute;
      top: 0;
      left: 50%;
      width: 4px;
      height: 25px;
      margin-left: -2px;
      background: linear-gradient(to top, var(--gold), transparent);
      transform-origin: center 80px;
      border-radius: 2px;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.9; }
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    h1 {
      font-family: var(--font-display);
      font-size: clamp(2rem, 6vw, 3.5rem);
      font-weight: 700;
      background: linear-gradient(135deg, var(--peach) 0%, var(--gold) 50%, var(--amber) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .tagline {
      font-size: 1.1rem;
      color: var(--mist);
      font-weight: 300;
    }

    /* Cards */
    .card {
      background: var(--gradient-card);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 40px rgba(245, 158, 11, 0.1);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .card-icon {
      font-size: 1.5rem;
    }

    .card-title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--peach);
    }

    /* Countdown grid */
    .countdown-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .countdown-item {
      text-align: center;
      padding: 1rem 0.5rem;
      background: rgba(0,0,0,0.2);
      border-radius: 12px;
    }

    .countdown-value {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 5vw, 2.5rem);
      font-weight: 700;
      color: var(--gold);
      line-height: 1;
      transition: transform 0.2s ease;
    }

    .countdown-value.tick {
      transform: scale(1.1);
    }

    .countdown-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--mist);
      margin-top: 0.25rem;
    }

    /* Daylight section */
    .daylight-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      text-align: center;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gold);
    }

    .stat-label {
      font-size: 0.8rem;
      color: var(--mist);
    }

    .gain-positive {
      color: var(--spring) !important;
    }

    /* Progress bar */
    .progress-container {
      margin-top: 1.5rem;
    }

    .progress-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: var(--mist);
      margin-bottom: 0.5rem;
    }

    .progress-bar {
      height: 12px;
      background: rgba(0,0,0,0.3);
      border-radius: 6px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--amber) 0%, var(--gold) 50%, var(--spring) 100%);
      border-radius: 6px;
      transition: width 1s ease-out;
    }

    /* Moon section */
    .moon-display {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .moon-visual {
      font-size: 4rem;
      line-height: 1;
    }

    .moon-info h3 {
      font-family: var(--font-display);
      font-size: 1.25rem;
      color: var(--peach);
      margin-bottom: 0.25rem;
    }

    .moon-details {
      font-size: 0.9rem;
      color: var(--mist);
    }

    /* Constellation list */
    .constellation-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .constellation-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: rgba(0,0,0,0.2);
      border-radius: 10px;
    }

    .constellation-name {
      font-weight: 500;
    }

    .constellation-meta {
      font-size: 0.85rem;
      color: var(--mist);
    }

    .constellation-direction {
      background: var(--navy);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    /* Sky lore */
    .lore-item {
      padding: 1rem;
      background: rgba(0,0,0,0.2);
      border-radius: 12px;
      margin-bottom: 0.75rem;
      border-left: 3px solid var(--amber);
    }

    .lore-title {
      font-family: var(--font-display);
      font-weight: 500;
      color: var(--peach);
      margin-bottom: 0.5rem;
    }

    .lore-content {
      font-size: 0.9rem;
      color: var(--mist);
      line-height: 1.6;
    }

    .lore-culture {
      font-size: 0.75rem;
      color: var(--gold);
      margin-top: 0.5rem;
    }

    /* Footer */
    footer {
      text-align: center;
      padding: 2rem 0;
      color: var(--mist);
      font-size: 0.85rem;
    }

    footer a {
      color: var(--gold);
      text-decoration: none;
    }

    /* Loading state */
    .loading {
      opacity: 0.5;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .countdown-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .daylight-stats {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }

      .moon-display {
        flex-direction: column;
        text-align: center;
      }
    }

    /* Animations */
    .fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .stagger-1 { animation-delay: 0.1s; opacity: 0; }
    .stagger-2 { animation-delay: 0.2s; opacity: 0; }
    .stagger-3 { animation-delay: 0.3s; opacity: 0; }
    .stagger-4 { animation-delay: 0.4s; opacity: 0; }
    .stagger-5 { animation-delay: 0.5s; opacity: 0; }
  </style>
</head>
<body>
  <!-- Starfield -->
  <div class="stars" id="stars"></div>

  <div class="container">
    <!-- Header -->
    <header class="fade-in">
      <div class="sun-container">
        <div class="sun-rays">
          ${Array.from({length: 12}, (_, i) => `<div class="ray" style="transform: rotate(${i * 30}deg)"></div>`).join('')}
        </div>
        <div class="sun"></div>
      </div>
      <h1>Spring is Coming</h1>
      <p class="tagline">The days are getting longer since the winter solstice</p>
    </header>

    <!-- Spring Countdown -->
    <section class="card fade-in stagger-1">
      <div class="card-header">
        <span class="card-icon">🌸</span>
        <h2 class="card-title">Until Spring Equinox</h2>
      </div>
      <div class="countdown-grid" id="spring-countdown">
        <div class="countdown-item">
          <div class="countdown-value" id="spring-days">--</div>
          <div class="countdown-label">Days</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value" id="spring-hours">--</div>
          <div class="countdown-label">Hours</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value" id="spring-minutes">--</div>
          <div class="countdown-label">Minutes</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value" id="spring-seconds">--</div>
          <div class="countdown-label">Seconds</div>
        </div>
      </div>
    </section>

    <!-- DST Countdown -->
    <section class="card fade-in stagger-2">
      <div class="card-header">
        <span class="card-icon">⏰</span>
        <h2 class="card-title">Until "Spring Forward" DST</h2>
      </div>
      <div class="countdown-grid" id="dst-countdown">
        <div class="countdown-item">
          <div class="countdown-value" id="dst-days">--</div>
          <div class="countdown-label">Days</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value" id="dst-hours">--</div>
          <div class="countdown-label">Hours</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value" id="dst-minutes">--</div>
          <div class="countdown-label">Minutes</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value" id="dst-seconds">--</div>
          <div class="countdown-label">Seconds</div>
        </div>
      </div>
    </section>

    <!-- Daylight Tracking -->
    <section class="card fade-in stagger-3">
      <div class="card-header">
        <span class="card-icon">☀️</span>
        <h2 class="card-title">Today's Sunlight</h2>
      </div>
      <div class="daylight-stats">
        <div>
          <div class="stat-value" id="sunrise">--</div>
          <div class="stat-label">Sunrise</div>
        </div>
        <div>
          <div class="stat-value" id="daylight-duration">--</div>
          <div class="stat-label">Daylight</div>
        </div>
        <div>
          <div class="stat-value" id="sunset">--</div>
          <div class="stat-label">Sunset</div>
        </div>
      </div>
      <div class="daylight-stats" style="margin-top: 1rem;">
        <div>
          <div class="stat-value gain-positive" id="daily-gain">--</div>
          <div class="stat-label">More than yesterday</div>
        </div>
        <div>
          <div class="stat-value gain-positive" id="total-gain">--</div>
          <div class="stat-label">Since solstice</div>
        </div>
        <div>
          <div class="stat-value" id="progress-percent">--%</div>
          <div class="stat-label">To equal day/night</div>
        </div>
      </div>
      <div class="progress-container">
        <div class="progress-label">
          <span>Shortest day</span>
          <span>Equal day & night</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" id="progress-bar" style="width: 0%"></div>
        </div>
      </div>
    </section>

    <!-- Moon Phase -->
    <section class="card fade-in stagger-4">
      <div class="card-header">
        <span class="card-icon">🌙</span>
        <h2 class="card-title">Tonight's Moon</h2>
      </div>
      <div class="moon-display">
        <div class="moon-visual" id="moon-emoji">🌑</div>
        <div class="moon-info">
          <h3 id="moon-phase">Loading...</h3>
          <p class="moon-details" id="moon-details">--</p>
          <p class="moon-details" id="moon-zodiac">--</p>
        </div>
      </div>
    </section>

    <!-- Constellations -->
    <section class="card fade-in stagger-5">
      <div class="card-header">
        <span class="card-icon">✨</span>
        <h2 class="card-title">Tonight's Sky</h2>
      </div>
      <div class="constellation-list" id="constellations">
        <p class="loading">Loading visible constellations...</p>
      </div>
    </section>

    <!-- Sky Lore -->
    <section class="card fade-in stagger-5">
      <div class="card-header">
        <span class="card-icon">📜</span>
        <h2 class="card-title">Celestial Wisdom</h2>
      </div>
      <div id="sky-lore">
        <p class="loading">Loading ancient sky lore...</p>
      </div>
    </section>

    <footer>
      <p>Made with ☀️ to celebrate the return of light</p>
    </footer>
  </div>

  <script>
    // Generate stars
    function createStars() {
      const container = document.getElementById('stars');
      const count = 100;
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        container.appendChild(star);
      }
    }
    createStars();

    // State
    let data = null;
    let userLocation = { lat: 40.7128, lon: -74.006 };
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Get user location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          userLocation = { lat: pos.coords.latitude, lon: pos.coords.longitude };
          fetchData();
        },
        () => fetchData() // Use default if denied
      );
    } else {
      fetchData();
    }

    // Fetch all data
    async function fetchData() {
      try {
        const res = await fetch(\`/api/data?lat=\${userLocation.lat}&lon=\${userLocation.lon}&tz=\${timezone}\`);
        data = await res.json();
        updateUI();
      } catch (e) {
        console.error('Failed to fetch data:', e);
      }
    }

    // Update countdown every second
    async function updateCountdown() {
      try {
        const res = await fetch('/api/countdown');
        const countdowns = await res.json();

        // Spring
        updateValue('spring-days', countdowns.spring.days);
        updateValue('spring-hours', countdowns.spring.hours);
        updateValue('spring-minutes', countdowns.spring.minutes);
        updateValue('spring-seconds', countdowns.spring.seconds);

        // DST
        updateValue('dst-days', countdowns.dst.days);
        updateValue('dst-hours', countdowns.dst.hours);
        updateValue('dst-minutes', countdowns.dst.minutes);
        updateValue('dst-seconds', countdowns.dst.seconds);
      } catch (e) {
        console.error('Countdown update failed:', e);
      }
    }

    function updateValue(id, value) {
      const el = document.getElementById(id);
      if (el && el.textContent !== String(value)) {
        el.textContent = value;
        el.classList.add('tick');
        setTimeout(() => el.classList.remove('tick'), 200);
      }
    }

    // Update all UI elements
    function updateUI() {
      if (!data) return;

      // Daylight
      document.getElementById('sunrise').textContent = data.daylight.sunrise;
      document.getElementById('sunset').textContent = data.daylight.sunset;
      document.getElementById('daylight-duration').textContent = data.daylight.daylightDuration.formatted;
      document.getElementById('daily-gain').textContent = data.daylightGain.formatted;
      document.getElementById('total-gain').textContent = '+' + data.daylightGain.sinceSolstice.formatted;
      document.getElementById('progress-percent').textContent = data.springProgress.percentComplete + '%';
      document.getElementById('progress-bar').style.width = data.springProgress.percentComplete + '%';

      // Moon
      document.getElementById('moon-emoji').textContent = data.moon.phase.emoji;
      document.getElementById('moon-phase').textContent = data.moon.phase.phaseName;
      document.getElementById('moon-details').textContent =
        data.moon.phase.illumination + '% illuminated • Rise: ' + data.moon.times.rise + ' • Set: ' + data.moon.times.set;
      document.getElementById('moon-zodiac').textContent = 'Moon in ' + data.moon.zodiacSign;

      // Constellations
      const constEl = document.getElementById('constellations');
      if (data.constellations.length > 0) {
        constEl.innerHTML = data.constellations.map(c => \`
          <div class="constellation-item">
            <div>
              <div class="constellation-name">\${c.name}</div>
              <div class="constellation-meta">\${c.brightestStar} • \${c.difficulty}</div>
            </div>
            <span class="constellation-direction">\${c.currentDirection} • \${c.altitude}</span>
          </div>
        \`).join('');
      } else {
        constEl.innerHTML = '<p>No major constellations visible right now</p>';
      }

      // Sky Lore
      const loreEl = document.getElementById('sky-lore');
      loreEl.innerHTML = data.skyLore.map(l => \`
        <div class="lore-item">
          <div class="lore-title">\${l.title}</div>
          <div class="lore-content">\${l.content}</div>
          <div class="lore-culture">\${l.culture}</div>
        </div>
      \`).join('');

      // Initial countdown
      updateCountdown();
    }

    // Start countdown timer
    setInterval(updateCountdown, 1000);

    // Refresh full data every 5 minutes
    setInterval(fetchData, 5 * 60 * 1000);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  </script>
</body>
</html>`;
}

export default app;
