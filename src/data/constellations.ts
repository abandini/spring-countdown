/**
 * Constellation data and visibility calculations
 * Focused on Northern Hemisphere winter/spring viewing
 */

export interface Constellation {
  name: string;
  latinName: string;
  abbreviation: string;
  brightestStar: string;
  description: string;
  mythology: string;
  direction: 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW' | 'overhead';
  bestViewingMonths: number[];  // 1-12
  bestViewingTime: string;      // e.g., "9 PM - 2 AM"
  difficulty: 'easy' | 'moderate' | 'challenging';
  rightAscension: number;       // Hours (0-24)
  declination: number;          // Degrees (-90 to +90)
}

export interface VisibleConstellation extends Constellation {
  currentDirection: string;
  altitude: string;
  isHighInSky: boolean;
}

// Major constellations visible during winter/spring in Northern Hemisphere
export const CONSTELLATIONS: Constellation[] = [
  {
    name: 'Orion',
    latinName: 'Orion',
    abbreviation: 'Ori',
    brightestStar: 'Betelgeuse & Rigel',
    description: 'The Hunter - one of the most recognizable constellations with three stars forming his belt.',
    mythology: 'In Greek mythology, Orion was a giant huntsman placed among the stars by Zeus.',
    direction: 'S',
    bestViewingMonths: [12, 1, 2, 3],
    bestViewingTime: '8 PM - 1 AM',
    difficulty: 'easy',
    rightAscension: 5.5,
    declination: 0
  },
  {
    name: 'Ursa Major',
    latinName: 'Ursa Major',
    abbreviation: 'UMa',
    brightestStar: 'Alioth',
    description: 'The Great Bear - contains the famous Big Dipper asterism.',
    mythology: 'Zeus transformed Callisto into a bear; her son Arcas became Ursa Minor.',
    direction: 'N',
    bestViewingMonths: [1, 2, 3, 4, 5, 6],
    bestViewingTime: 'All night',
    difficulty: 'easy',
    rightAscension: 11,
    declination: 55
  },
  {
    name: 'Cassiopeia',
    latinName: 'Cassiopeia',
    abbreviation: 'Cas',
    brightestStar: 'Schedar',
    description: 'The Queen - a distinctive W or M shape, circumpolar in northern latitudes.',
    mythology: 'Queen Cassiopeia boasted she was more beautiful than the sea nymphs.',
    direction: 'N',
    bestViewingMonths: [9, 10, 11, 12, 1, 2],
    bestViewingTime: 'All night',
    difficulty: 'easy',
    rightAscension: 1,
    declination: 60
  },
  {
    name: 'Gemini',
    latinName: 'Gemini',
    abbreviation: 'Gem',
    brightestStar: 'Pollux',
    description: 'The Twins - features two bright stars representing Castor and Pollux.',
    mythology: 'The twins Castor and Pollux were brothers of Helen of Troy.',
    direction: 'E',
    bestViewingMonths: [12, 1, 2, 3, 4],
    bestViewingTime: '9 PM - 3 AM',
    difficulty: 'easy',
    rightAscension: 7,
    declination: 22
  },
  {
    name: 'Taurus',
    latinName: 'Taurus',
    abbreviation: 'Tau',
    brightestStar: 'Aldebaran',
    description: 'The Bull - home to the Pleiades star cluster and the orange giant Aldebaran.',
    mythology: 'Zeus disguised himself as a white bull to abduct Europa.',
    direction: 'W',
    bestViewingMonths: [11, 12, 1, 2, 3],
    bestViewingTime: '8 PM - 2 AM',
    difficulty: 'easy',
    rightAscension: 4.5,
    declination: 16
  },
  {
    name: 'Leo',
    latinName: 'Leo',
    abbreviation: 'Leo',
    brightestStar: 'Regulus',
    description: 'The Lion - a prominent spring constellation with a distinctive sickle shape.',
    mythology: 'Represents the Nemean Lion slain by Hercules as his first labor.',
    direction: 'E',
    bestViewingMonths: [2, 3, 4, 5, 6],
    bestViewingTime: '9 PM - 4 AM',
    difficulty: 'easy',
    rightAscension: 10.5,
    declination: 15
  },
  {
    name: 'Canis Major',
    latinName: 'Canis Major',
    abbreviation: 'CMa',
    brightestStar: 'Sirius',
    description: 'The Great Dog - contains Sirius, the brightest star in the night sky.',
    mythology: 'One of Orion\'s hunting dogs, faithful companion following the hunter.',
    direction: 'S',
    bestViewingMonths: [12, 1, 2, 3],
    bestViewingTime: '8 PM - 1 AM',
    difficulty: 'easy',
    rightAscension: 6.75,
    declination: -20
  },
  {
    name: 'Auriga',
    latinName: 'Auriga',
    abbreviation: 'Aur',
    brightestStar: 'Capella',
    description: 'The Charioteer - features brilliant Capella, the 6th brightest star.',
    mythology: 'Often depicted as a charioteer holding a goat and kids.',
    direction: 'N',
    bestViewingMonths: [11, 12, 1, 2, 3],
    bestViewingTime: '8 PM - 3 AM',
    difficulty: 'moderate',
    rightAscension: 6,
    declination: 42
  },
  {
    name: 'Perseus',
    latinName: 'Perseus',
    abbreviation: 'Per',
    brightestStar: 'Mirfak',
    description: 'The Hero - home to the famous variable star Algol, the "Demon Star."',
    mythology: 'Perseus slew Medusa and rescued Andromeda from a sea monster.',
    direction: 'NE',
    bestViewingMonths: [10, 11, 12, 1, 2],
    bestViewingTime: '8 PM - 2 AM',
    difficulty: 'moderate',
    rightAscension: 3.5,
    declination: 45
  },
  {
    name: 'Andromeda',
    latinName: 'Andromeda',
    abbreviation: 'And',
    brightestStar: 'Alpheratz',
    description: 'The Princess - contains the Andromeda Galaxy, visible to the naked eye.',
    mythology: 'Princess Andromeda was chained to a rock as sacrifice to a sea monster.',
    direction: 'NE',
    bestViewingMonths: [9, 10, 11, 12, 1],
    bestViewingTime: '8 PM - 1 AM',
    difficulty: 'moderate',
    rightAscension: 1,
    declination: 38
  },
  {
    name: 'Cygnus',
    latinName: 'Cygnus',
    abbreviation: 'Cyg',
    brightestStar: 'Deneb',
    description: 'The Swan - forms the Northern Cross, part of the Summer Triangle.',
    mythology: 'Zeus disguised as a swan to seduce Leda.',
    direction: 'NW',
    bestViewingMonths: [6, 7, 8, 9, 10, 11],
    bestViewingTime: '9 PM - 4 AM',
    difficulty: 'easy',
    rightAscension: 20.5,
    declination: 42
  },
  {
    name: 'Lyra',
    latinName: 'Lyra',
    abbreviation: 'Lyr',
    brightestStar: 'Vega',
    description: 'The Lyre - small but contains Vega, the 5th brightest star.',
    mythology: 'The lyre of Orpheus, whose music could charm all living things.',
    direction: 'NW',
    bestViewingMonths: [5, 6, 7, 8, 9, 10],
    bestViewingTime: '10 PM - 4 AM',
    difficulty: 'easy',
    rightAscension: 18.75,
    declination: 36
  },
  {
    name: 'Draco',
    latinName: 'Draco',
    abbreviation: 'Dra',
    brightestStar: 'Eltanin',
    description: 'The Dragon - a long, winding circumpolar constellation.',
    mythology: 'The dragon Ladon who guarded the golden apples in the Garden of Hesperides.',
    direction: 'N',
    bestViewingMonths: [3, 4, 5, 6, 7, 8],
    bestViewingTime: 'All night',
    difficulty: 'challenging',
    rightAscension: 15,
    declination: 65
  },
  {
    name: 'Boötes',
    latinName: 'Boötes',
    abbreviation: 'Boo',
    brightestStar: 'Arcturus',
    description: 'The Herdsman - features orange Arcturus, 4th brightest star in the sky.',
    mythology: 'The plowman who drives the bears around the pole.',
    direction: 'E',
    bestViewingMonths: [3, 4, 5, 6, 7],
    bestViewingTime: '10 PM - 4 AM',
    difficulty: 'moderate',
    rightAscension: 14.5,
    declination: 30
  },
  {
    name: 'Virgo',
    latinName: 'Virgo',
    abbreviation: 'Vir',
    brightestStar: 'Spica',
    description: 'The Maiden - a large spring constellation with blue-white Spica.',
    mythology: 'Associated with harvest goddesses Demeter, Persephone, and Astraea.',
    direction: 'SE',
    bestViewingMonths: [3, 4, 5, 6],
    bestViewingTime: '10 PM - 4 AM',
    difficulty: 'moderate',
    rightAscension: 13,
    declination: -5
  }
];

/**
 * Calculate Local Sidereal Time (simplified)
 */
function getLocalSiderealTime(date: Date, longitude: number): number {
  const J2000 = new Date('2000-01-01T12:00:00Z');
  const daysSinceJ2000 = (date.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);

  // Greenwich Mean Sidereal Time
  let gmst = 18.697374558 + 24.06570982441908 * daysSinceJ2000;
  gmst = gmst % 24;
  if (gmst < 0) gmst += 24;

  // Local Sidereal Time
  let lst = gmst + longitude / 15;
  lst = lst % 24;
  if (lst < 0) lst += 24;

  return lst;
}

/**
 * Calculate altitude of an object given hour angle and declination
 */
function calculateAltitude(hourAngle: number, declination: number, latitude: number): number {
  const ha = hourAngle * 15 * Math.PI / 180; // Convert to radians
  const dec = declination * Math.PI / 180;
  const lat = latitude * Math.PI / 180;

  const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha);
  return Math.asin(sinAlt) * 180 / Math.PI;
}

/**
 * Calculate azimuth of an object
 */
function calculateAzimuth(hourAngle: number, declination: number, latitude: number, altitude: number): number {
  const ha = hourAngle * 15 * Math.PI / 180;
  const dec = declination * Math.PI / 180;
  const lat = latitude * Math.PI / 180;
  const alt = altitude * Math.PI / 180;

  const cosAz = (Math.sin(dec) - Math.sin(alt) * Math.sin(lat)) / (Math.cos(alt) * Math.cos(lat));
  let azimuth = Math.acos(Math.max(-1, Math.min(1, cosAz))) * 180 / Math.PI;

  if (Math.sin(ha) > 0) {
    azimuth = 360 - azimuth;
  }

  return azimuth;
}

/**
 * Convert azimuth to compass direction
 */
function azimuthToDirection(azimuth: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(azimuth / 22.5) % 16;
  return directions[index];
}

/**
 * Get constellations visible tonight for a given location
 */
export function getVisibleConstellations(
  date: Date,
  lat: number,
  lon: number
): VisibleConstellation[] {
  const currentMonth = date.getMonth() + 1;
  const lst = getLocalSiderealTime(date, lon);

  const visible: VisibleConstellation[] = [];

  for (const constellation of CONSTELLATIONS) {
    // Check if this is a good month for viewing
    if (!constellation.bestViewingMonths.includes(currentMonth)) {
      continue;
    }

    // Calculate hour angle
    let hourAngle = lst - constellation.rightAscension;
    if (hourAngle > 12) hourAngle -= 24;
    if (hourAngle < -12) hourAngle += 24;

    // Calculate altitude
    const altitude = calculateAltitude(hourAngle, constellation.declination, lat);

    // Must be above horizon (with some buffer for best viewing)
    if (altitude < 10) {
      continue;
    }

    // Calculate azimuth for direction
    const azimuth = calculateAzimuth(hourAngle, constellation.declination, lat, altitude);
    const direction = azimuthToDirection(azimuth);

    visible.push({
      ...constellation,
      currentDirection: direction,
      altitude: altitude > 60 ? 'High in sky' : altitude > 30 ? 'Mid-sky' : 'Low on horizon',
      isHighInSky: altitude > 45
    });
  }

  // Sort by altitude (best viewing first)
  return visible.sort((a, b) => {
    const aScore = a.isHighInSky ? 2 : (a.altitude === 'Mid-sky' ? 1 : 0);
    const bScore = b.isHighInSky ? 2 : (b.altitude === 'Mid-sky' ? 1 : 0);
    return bScore - aScore;
  });
}

/**
 * Get the best constellation to observe right now
 */
export function getBestConstellationNow(date: Date, lat: number, lon: number): VisibleConstellation | null {
  const visible = getVisibleConstellations(date, lat, lon);
  return visible.length > 0 ? visible[0] : null;
}

/**
 * Get constellations by difficulty level
 */
export function getConstellationsByDifficulty(
  difficulty: 'easy' | 'moderate' | 'challenging'
): Constellation[] {
  return CONSTELLATIONS.filter(c => c.difficulty === difficulty);
}
