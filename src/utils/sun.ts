/**
 * Sun calculation utilities
 * Handles sunrise, sunset, daylight duration, and twilight times
 */

import SunCalc from 'suncalc';

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  dawn: Date;         // Civil twilight start
  dusk: Date;         // Civil twilight end
  nauticalDawn: Date;
  nauticalDusk: Date;
  nightStart: Date;   // Astronomical twilight end
  nightEnd: Date;     // Astronomical twilight start
  goldenHourStart: Date;
  goldenHourEnd: Date;
}

export interface DaylightInfo {
  sunrise: string;
  sunset: string;
  daylightDuration: {
    hours: number;
    minutes: number;
    totalMinutes: number;
    formatted: string;
  };
  sunPosition: {
    altitude: number;  // degrees above horizon
    azimuth: number;   // compass direction
  };
  twilight: {
    civilDawn: string;
    civilDusk: string;
    nauticalDawn: string;
    nauticalDusk: string;
    astronomicalDawn: string;
    astronomicalDusk: string;
    goldenHourMorning: { start: string; end: string };
    goldenHourEvening: { start: string; end: string };
  };
}

export interface DaylightGain {
  todayMinutes: number;
  yesterdayMinutes: number;
  gainMinutes: number;
  gainSeconds: number;
  formatted: string;
  sinceSolstice: {
    totalMinutesGained: number;
    formatted: string;
  };
}

// Winter solstice 2024 - shortest day
const WINTER_SOLSTICE_2024 = new Date('2024-12-21T09:20:00Z');

// Spring equinox 2025
const SPRING_EQUINOX_2025 = new Date('2025-03-20T09:01:00Z');

/**
 * Format time to locale string
 */
function formatTime(date: Date, timezone?: string): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone
  });
}

/**
 * Get sun times for a specific date and location
 */
export function getSunTimes(date: Date, lat: number, lon: number): SunTimes {
  const times = SunCalc.getTimes(date, lat, lon);

  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    solarNoon: times.solarNoon,
    dawn: times.dawn,
    dusk: times.dusk,
    nauticalDawn: times.nauticalDawn,
    nauticalDusk: times.nauticalDusk,
    nightStart: times.night,
    nightEnd: times.nightEnd,
    goldenHourStart: times.goldenHour,
    goldenHourEnd: times.goldenHourEnd
  };
}

/**
 * Calculate daylight duration in minutes
 */
export function getDaylightMinutes(date: Date, lat: number, lon: number): number {
  const times = getSunTimes(date, lat, lon);
  const durationMs = times.sunset.getTime() - times.sunrise.getTime();
  return Math.round(durationMs / (1000 * 60));
}

/**
 * Get complete daylight information for a date and location
 */
export function getDaylightInfo(date: Date, lat: number, lon: number, timezone?: string): DaylightInfo {
  const times = getSunTimes(date, lat, lon);
  const position = SunCalc.getPosition(date, lat, lon);

  const durationMs = times.sunset.getTime() - times.sunrise.getTime();
  const totalMinutes = Math.round(durationMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    sunrise: formatTime(times.sunrise, timezone),
    sunset: formatTime(times.sunset, timezone),
    daylightDuration: {
      hours,
      minutes,
      totalMinutes,
      formatted: `${hours}h ${minutes}m`
    },
    sunPosition: {
      altitude: position.altitude * (180 / Math.PI), // Convert to degrees
      azimuth: position.azimuth * (180 / Math.PI) + 180 // Convert to compass bearing
    },
    twilight: {
      civilDawn: formatTime(times.dawn, timezone),
      civilDusk: formatTime(times.dusk, timezone),
      nauticalDawn: formatTime(times.nauticalDawn, timezone),
      nauticalDusk: formatTime(times.nauticalDusk, timezone),
      astronomicalDawn: formatTime(times.nightEnd, timezone),
      astronomicalDusk: formatTime(times.nightStart, timezone),
      goldenHourMorning: {
        start: formatTime(times.sunrise, timezone),
        end: formatTime(times.goldenHourEnd, timezone)
      },
      goldenHourEvening: {
        start: formatTime(times.goldenHourStart, timezone),
        end: formatTime(times.sunset, timezone)
      }
    }
  };
}

/**
 * Calculate daylight gain compared to yesterday and since solstice
 */
export function getDaylightGain(date: Date, lat: number, lon: number): DaylightGain {
  const today = new Date(date);
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayMinutes = getDaylightMinutes(today, lat, lon);
  const yesterdayMinutes = getDaylightMinutes(yesterday, lat, lon);
  const gainMinutes = todayMinutes - yesterdayMinutes;
  const gainSeconds = Math.round((gainMinutes - Math.floor(gainMinutes)) * 60);

  // Calculate gain since winter solstice
  const solsticeMinutes = getDaylightMinutes(WINTER_SOLSTICE_2024, lat, lon);
  const totalGained = todayMinutes - solsticeMinutes;

  const gainHours = Math.floor(totalGained / 60);
  const gainMins = totalGained % 60;

  return {
    todayMinutes,
    yesterdayMinutes,
    gainMinutes: Math.floor(gainMinutes),
    gainSeconds: Math.abs(gainSeconds),
    formatted: gainMinutes >= 1
      ? `+${Math.floor(gainMinutes)}m ${Math.abs(gainSeconds)}s`
      : `+${Math.abs(Math.round(gainMinutes * 60))}s`,
    sinceSolstice: {
      totalMinutesGained: totalGained,
      formatted: totalGained > 60
        ? `${gainHours}h ${gainMins}m`
        : `${totalGained}m`
    }
  };
}

/**
 * Get progress toward spring equinox (when day equals night ~12 hours)
 */
export function getSpringProgress(date: Date, lat: number, lon: number): {
  currentDaylight: number;
  targetDaylight: number; // ~12 hours at equinox
  percentComplete: number;
  daysRemaining: number;
} {
  const currentDaylight = getDaylightMinutes(date, lat, lon);
  const solsticeDaylight = getDaylightMinutes(WINTER_SOLSTICE_2024, lat, lon);
  const equinoxDaylight = 12 * 60; // 12 hours in minutes

  const totalGainNeeded = equinoxDaylight - solsticeDaylight;
  const currentGain = currentDaylight - solsticeDaylight;
  const percentComplete = Math.min(100, Math.round((currentGain / totalGainNeeded) * 100));

  const msRemaining = SPRING_EQUINOX_2025.getTime() - date.getTime();
  const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

  return {
    currentDaylight,
    targetDaylight: equinoxDaylight,
    percentComplete,
    daysRemaining: Math.max(0, daysRemaining)
  };
}

/**
 * Get countdown to spring equinox and DST
 */
export function getCountdowns(now: Date = new Date()): {
  spring: {
    target: Date;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
  };
  dst: {
    target: Date;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
  };
} {
  // DST 2025 starts March 9 at 2:00 AM local
  const DST_2025 = new Date('2025-03-09T07:00:00Z'); // 2AM EST = 7AM UTC

  const springMs = Math.max(0, SPRING_EQUINOX_2025.getTime() - now.getTime());
  const dstMs = Math.max(0, DST_2025.getTime() - now.getTime());

  return {
    spring: {
      target: SPRING_EQUINOX_2025,
      days: Math.floor(springMs / (1000 * 60 * 60 * 24)),
      hours: Math.floor((springMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((springMs % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((springMs % (1000 * 60)) / 1000),
      totalMs: springMs
    },
    dst: {
      target: DST_2025,
      days: Math.floor(dstMs / (1000 * 60 * 60 * 24)),
      hours: Math.floor((dstMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((dstMs % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((dstMs % (1000 * 60)) / 1000),
      totalMs: dstMs
    }
  };
}
