# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spring Countdown is a PWA that celebrates the return of longer days by counting down to the spring equinox and DST. It tracks sunlight gain, moon phases, and visible constellations with interactive star pattern visualizations.

**Live site**: https://springcountdown.com

## Development Commands

```bash
npm run dev           # Local dev server (localhost:8787)
npm run dev:remote    # Dev against real Cloudflare services
npm run deploy        # Deploy to production
npm run typecheck     # TypeScript type checking
npm run test          # Run tests with Vitest

# Database migrations
npm run db:migrate:local   # Apply migrations locally
npm run db:migrate         # Apply migrations to production D1
```

## Architecture

### Tech Stack
- **Runtime**: Cloudflare Workers
- **Framework**: Hono (with JSX support via `hono/jsx`)
- **Database**: D1 (SQLite) - user preferences, visit streaks, fun facts
- **Cache**: KV - sunrise/sunset data caching
- **Storage**: R2 - generated share images
- **AI**: Workers AI - daily encouragements

### Cloudflare Bindings (defined in wrangler.toml)
```typescript
interface Env {
  DB: D1Database;      // spring-db
  KV: KVNamespace;     // Cache
  STORAGE: R2Bucket;   // spring-images
  AI: Ai;              // Workers AI
  ENVIRONMENT: string;
  SPRING_EQUINOX: string;  // UTC timestamp
  DST_START: string;       // UTC timestamp
}
```

### Source Structure

```
src/
├── index.ts              # Main Hono app - routes + full HTML/CSS/JS rendering
├── data/
│   ├── constellations.ts # 36 constellation definitions with SVG star patterns
│   └── sky-lore.ts       # Daily celestial facts and upcoming events
└── utils/
    ├── sun.ts            # Sunrise/sunset calculations (uses suncalc)
    └── moon.ts           # Moon phase and position calculations
```

### Key Design Decisions

1. **Single-file HTML rendering**: The main `index.ts` contains all HTML, CSS, and client-side JS inline. This is intentional for Cloudflare Workers edge delivery - no build step needed for frontend assets.

2. **Location detection**: Uses Cloudflare's `cf-ipcountry`/`cf-iplongitude`/`cf-iplatitude` headers for automatic geolocation, with optional browser geolocation for precision.

3. **Star patterns**: Each constellation has a `StarPattern` object with normalized (0-100) coordinates and line connections for SVG rendering. Patterns are rendered client-side in modals.

4. **Time calculations**: All astronomical calculations use the `suncalc` library. Times are computed server-side based on user location and timezone.

### API Endpoints

- `GET /api/data?lat=&lon=&tz=` - All data (countdowns, daylight, moon, constellations)
- `GET /api/countdown` - Just countdown timers (for frequent polling)
- `GET /api/constellation/:name?lat=&lon=` - Constellation details with viewing info
- `GET /health` - Health check

### PWA Assets

```
public/
├── manifest.json    # PWA manifest
├── sw.js           # Service worker
└── icons/          # SVG icons (192x192, 512x512)
```

## Environment Configuration

Key dates are configured as environment variables in `wrangler.toml`:
- `SPRING_EQUINOX` - UTC timestamp for target spring equinox
- `DST_START` - UTC timestamp for DST "spring forward"

Update these annually after each spring.
