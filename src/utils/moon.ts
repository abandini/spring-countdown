/**
 * Moon phase and lunar calculations
 * Uses SunCalc for accurate astronomical data
 */

import SunCalc from 'suncalc';

export type MoonPhaseName =
  | 'New Moon'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full Moon'
  | 'Waning Gibbous'
  | 'Last Quarter'
  | 'Waning Crescent';

export interface MoonPhase {
  phase: number;           // 0-1 (0 = new moon, 0.5 = full moon)
  phaseName: MoonPhaseName;
  illumination: number;    // 0-100 percentage
  emoji: string;
  description: string;
  angle: number;           // For visual rendering
}

export interface MoonPosition {
  altitude: number;        // Degrees above horizon
  azimuth: number;         // Compass direction
  distance: number;        // km from Earth
  parallacticAngle: number;
}

export interface MoonTimes {
  rise: Date | null;
  set: Date | null;
  alwaysUp: boolean;
  alwaysDown: boolean;
}

export interface MoonInfo {
  phase: MoonPhase;
  position: MoonPosition;
  times: MoonTimes;
  nextFullMoon: Date;
  nextNewMoon: Date;
  zodiacSign: string;
}

// Moon phase names based on phase value (0-1)
function getPhaseName(phase: number): MoonPhaseName {
  if (phase < 0.0625) return 'New Moon';
  if (phase < 0.1875) return 'Waxing Crescent';
  if (phase < 0.3125) return 'First Quarter';
  if (phase < 0.4375) return 'Waxing Gibbous';
  if (phase < 0.5625) return 'Full Moon';
  if (phase < 0.6875) return 'Waning Gibbous';
  if (phase < 0.8125) return 'Last Quarter';
  if (phase < 0.9375) return 'Waning Crescent';
  return 'New Moon';
}

// Moon emoji based on phase
function getPhaseEmoji(phase: number): string {
  if (phase < 0.0625) return '🌑';
  if (phase < 0.1875) return '🌒';
  if (phase < 0.3125) return '🌓';
  if (phase < 0.4375) return '🌔';
  if (phase < 0.5625) return '🌕';
  if (phase < 0.6875) return '🌖';
  if (phase < 0.8125) return '🌗';
  if (phase < 0.9375) return '🌘';
  return '🌑';
}

// Descriptions for each phase
function getPhaseDescription(phaseName: MoonPhaseName): string {
  const descriptions: Record<MoonPhaseName, string> = {
    'New Moon': 'The moon is between Earth and the Sun, invisible in the night sky. A time of new beginnings.',
    'Waxing Crescent': 'A sliver of moon appears in the western sky after sunset. The light is growing.',
    'First Quarter': 'Half the moon is illuminated. A time of decision and action.',
    'Waxing Gibbous': 'More than half illuminated and growing toward full. Building momentum.',
    'Full Moon': 'The entire face is illuminated. Peak energy, illumination, and clarity.',
    'Waning Gibbous': 'Just past full, beginning to decrease. Time for gratitude and sharing.',
    'Last Quarter': 'Half illuminated but shrinking. A time of release and letting go.',
    'Waning Crescent': 'A thin crescent in the eastern pre-dawn sky. Rest and reflection before renewal.'
  };
  return descriptions[phaseName];
}

// Calculate approximate zodiac sign based on moon's ecliptic longitude
function getMoonZodiac(date: Date): string {
  // Simplified calculation - moon takes ~27.3 days to complete zodiac
  const lunation = 27.321661; // Sidereal month in days
  const referenceDate = new Date('2000-01-06T18:14:00Z'); // Moon in Aries
  const daysSinceRef = (date.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24);
  const position = (daysSinceRef % lunation) / lunation;

  const signs = [
    'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋',
    'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏',
    'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
  ];

  const index = Math.floor(position * 12) % 12;
  return signs[index];
}

// Find next occurrence of a specific phase
function findNextPhase(startDate: Date, targetPhase: number, tolerance: number = 0.02): Date {
  const date = new Date(startDate);
  const maxDays = 30; // Lunar cycle is ~29.5 days

  for (let i = 0; i < maxDays * 24; i++) { // Check hourly
    date.setTime(startDate.getTime() + i * 60 * 60 * 1000);
    const illumination = SunCalc.getMoonIllumination(date);

    if (Math.abs(illumination.phase - targetPhase) < tolerance) {
      return date;
    }
  }

  // Fallback: return approximate date
  const daysUntil = ((targetPhase - SunCalc.getMoonIllumination(startDate).phase + 1) % 1) * 29.53;
  return new Date(startDate.getTime() + daysUntil * 24 * 60 * 60 * 1000);
}

/**
 * Get current moon phase information
 */
export function getMoonPhase(date: Date = new Date()): MoonPhase {
  const illumination = SunCalc.getMoonIllumination(date);

  const phaseName = getPhaseName(illumination.phase);

  return {
    phase: illumination.phase,
    phaseName,
    illumination: Math.round(illumination.fraction * 100),
    emoji: getPhaseEmoji(illumination.phase),
    description: getPhaseDescription(phaseName),
    angle: illumination.angle
  };
}

/**
 * Get moon position for a location
 */
export function getMoonPosition(date: Date, lat: number, lon: number): MoonPosition {
  const position = SunCalc.getMoonPosition(date, lat, lon);

  return {
    altitude: position.altitude * (180 / Math.PI),
    azimuth: position.azimuth * (180 / Math.PI) + 180,
    distance: position.distance,
    parallacticAngle: position.parallacticAngle * (180 / Math.PI)
  };
}

/**
 * Get moon rise/set times for a location
 */
export function getMoonTimes(date: Date, lat: number, lon: number): MoonTimes {
  const times = SunCalc.getMoonTimes(date, lat, lon);

  return {
    rise: times.rise || null,
    set: times.set || null,
    alwaysUp: times.alwaysUp || false,
    alwaysDown: times.alwaysDown || false
  };
}

/**
 * Get complete moon information
 */
export function getMoonInfo(date: Date, lat: number, lon: number): MoonInfo {
  const phase = getMoonPhase(date);
  const position = getMoonPosition(date, lat, lon);
  const times = getMoonTimes(date, lat, lon);

  return {
    phase,
    position,
    times,
    nextFullMoon: findNextPhase(date, 0.5),
    nextNewMoon: findNextPhase(date, 0),
    zodiacSign: getMoonZodiac(date)
  };
}

/**
 * Format moon times for display
 */
export function formatMoonTimes(times: MoonTimes, timezone?: string): {
  rise: string;
  set: string;
} {
  const format = (date: Date | null): string => {
    if (!date) return '--';
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone
    });
  };

  return {
    rise: times.alwaysUp ? 'Always up' : (times.alwaysDown ? 'Always down' : format(times.rise)),
    set: times.alwaysUp ? 'Always up' : (times.alwaysDown ? 'Always down' : format(times.set))
  };
}
