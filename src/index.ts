import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';

// Type definitions for Cloudflare bindings
export interface Env {
  // D1 Database
  DB: D1Database;
  // KV Namespace
  KV: KVNamespace;
  // R2 Bucket
  STORAGE: R2Bucket;
  // Workers AI
  AI: Ai;
  // Environment variables
  ENVIRONMENT: string;
  SPRING_EQUINOX: string;
  DST_START: string;
}

const app = new Hono<{ Bindings: Env }>();

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api/countdown', (c) => {
  const now = new Date();
  const springEquinox = new Date(c.env.SPRING_EQUINOX);
  const dstStart = new Date(c.env.DST_START);

  const msToSpring = springEquinox.getTime() - now.getTime();
  const msToDst = dstStart.getTime() - now.getTime();

  const daysToSpring = Math.floor(msToSpring / (1000 * 60 * 60 * 24));
  const hoursToSpring = Math.floor((msToSpring % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesToSpring = Math.floor((msToSpring % (1000 * 60 * 60)) / (1000 * 60));
  const secondsToSpring = Math.floor((msToSpring % (1000 * 60)) / 1000);

  const daysToDst = Math.floor(msToDst / (1000 * 60 * 60 * 24));
  const hoursToDst = Math.floor((msToDst % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesToDst = Math.floor((msToDst % (1000 * 60 * 60)) / (1000 * 60));
  const secondsToDst = Math.floor((msToDst % (1000 * 60)) / 1000);

  return c.json({
    now: now.toISOString(),
    spring: {
      target: springEquinox.toISOString(),
      remaining: {
        total_ms: msToSpring,
        days: daysToSpring,
        hours: hoursToSpring,
        minutes: minutesToSpring,
        seconds: secondsToSpring
      }
    },
    dst: {
      target: dstStart.toISOString(),
      remaining: {
        total_ms: msToDst,
        days: daysToDst,
        hours: hoursToDst,
        minutes: minutesToDst,
        seconds: secondsToDst
      }
    }
  });
});

// Serve the main app (will be static HTML for PWA)
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#FF9500">
  <meta name="description" content="Count down to spring and watch the days get longer!">
  <title>Spring Countdown - Days are Getting Longer!</title>
  <link rel="manifest" href="/manifest.json">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --sun-gold: #FF9500;
      --sun-orange: #FF6B00;
      --sky-blue: #87CEEB;
      --spring-green: #7CB342;
      --warm-white: #FFF8E1;
      --text-dark: #2D1B00;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, var(--sky-blue) 0%, var(--warm-white) 50%, var(--spring-green) 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--text-dark);
      padding: 1rem;
    }

    .container {
      text-align: center;
      max-width: 600px;
    }

    .sun-icon {
      font-size: 4rem;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.9; }
    }

    h1 {
      font-size: 2.5rem;
      margin: 1rem 0;
      background: linear-gradient(135deg, var(--sun-orange), var(--sun-gold));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .tagline {
      font-size: 1.2rem;
      opacity: 0.8;
      margin-bottom: 2rem;
    }

    .countdown-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin: 2rem 0;
    }

    .countdown-item {
      background: rgba(255,255,255,0.9);
      border-radius: 12px;
      padding: 1rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .countdown-value {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--sun-orange);
    }

    .countdown-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.7;
    }

    .section-title {
      font-size: 1.5rem;
      margin: 2rem 0 1rem;
      color: var(--spring-green);
    }

    .loading {
      opacity: 0.5;
    }

    .footer {
      margin-top: 3rem;
      opacity: 0.6;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="sun-icon">☀️</div>
    <h1>Spring is Coming!</h1>
    <p class="tagline">The days are getting longer since the winter solstice</p>

    <h2 class="section-title">🌸 Until Spring Equinox</h2>
    <div class="countdown-grid" id="spring-countdown">
      <div class="countdown-item">
        <div class="countdown-value loading" id="spring-days">--</div>
        <div class="countdown-label">Days</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value loading" id="spring-hours">--</div>
        <div class="countdown-label">Hours</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value loading" id="spring-minutes">--</div>
        <div class="countdown-label">Minutes</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value loading" id="spring-seconds">--</div>
        <div class="countdown-label">Seconds</div>
      </div>
    </div>

    <h2 class="section-title">⏰ Until "Spring Forward" DST</h2>
    <div class="countdown-grid" id="dst-countdown">
      <div class="countdown-item">
        <div class="countdown-value loading" id="dst-days">--</div>
        <div class="countdown-label">Days</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value loading" id="dst-hours">--</div>
        <div class="countdown-label">Hours</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value loading" id="dst-minutes">--</div>
        <div class="countdown-label">Minutes</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value loading" id="dst-seconds">--</div>
        <div class="countdown-label">Seconds</div>
      </div>
    </div>

    <p class="footer">
      Made with ☀️ to celebrate the return of longer days
    </p>
  </div>

  <script>
    async function updateCountdown() {
      try {
        const response = await fetch('/api/countdown');
        const data = await response.json();

        // Update Spring countdown
        document.getElementById('spring-days').textContent = data.spring.remaining.days;
        document.getElementById('spring-hours').textContent = data.spring.remaining.hours;
        document.getElementById('spring-minutes').textContent = data.spring.remaining.minutes;
        document.getElementById('spring-seconds').textContent = data.spring.remaining.seconds;

        // Update DST countdown
        document.getElementById('dst-days').textContent = data.dst.remaining.days;
        document.getElementById('dst-hours').textContent = data.dst.remaining.hours;
        document.getElementById('dst-minutes').textContent = data.dst.remaining.minutes;
        document.getElementById('dst-seconds').textContent = data.dst.remaining.seconds;

        // Remove loading state
        document.querySelectorAll('.countdown-value').forEach(el => {
          el.classList.remove('loading');
        });
      } catch (error) {
        console.error('Failed to fetch countdown:', error);
      }
    }

    // Initial load
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service worker registration failed:', err);
      });
    }
  </script>
</body>
</html>
  `);
});

export default app;
