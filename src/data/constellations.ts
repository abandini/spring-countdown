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
  },
  // Additional constellations for year-round coverage
  {
    name: 'Ursa Minor',
    latinName: 'Ursa Minor',
    abbreviation: 'UMi',
    brightestStar: 'Polaris',
    description: 'The Little Bear - contains Polaris, the North Star, at the end of its tail.',
    mythology: 'Arcas, son of Callisto, transformed into a bear to join his mother in the sky.',
    direction: 'N',
    bestViewingMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    bestViewingTime: 'All night',
    difficulty: 'moderate',
    rightAscension: 15,
    declination: 75
  },
  {
    name: 'Cepheus',
    latinName: 'Cepheus',
    abbreviation: 'Cep',
    brightestStar: 'Alderamin',
    description: 'The King - a house-shaped constellation representing Cassiopeia\'s husband.',
    mythology: 'King Cepheus of Ethiopia, father of Andromeda.',
    direction: 'N',
    bestViewingMonths: [8, 9, 10, 11, 12, 1],
    bestViewingTime: 'All night',
    difficulty: 'moderate',
    rightAscension: 22,
    declination: 65
  },
  {
    name: 'Pegasus',
    latinName: 'Pegasus',
    abbreviation: 'Peg',
    brightestStar: 'Enif',
    description: 'The Winged Horse - features the Great Square asterism, easy autumn landmark.',
    mythology: 'The winged horse born from Medusa\'s blood when Perseus slew her.',
    direction: 'S',
    bestViewingMonths: [8, 9, 10, 11, 12],
    bestViewingTime: '9 PM - 2 AM',
    difficulty: 'easy',
    rightAscension: 22.5,
    declination: 20
  },
  {
    name: 'Aquarius',
    latinName: 'Aquarius',
    abbreviation: 'Aqr',
    brightestStar: 'Sadalsuud',
    description: 'The Water Bearer - an ancient constellation associated with floods and rain.',
    mythology: 'Ganymede, cupbearer to the gods, pouring water from an urn.',
    direction: 'S',
    bestViewingMonths: [9, 10, 11],
    bestViewingTime: '9 PM - 1 AM',
    difficulty: 'challenging',
    rightAscension: 22.5,
    declination: -10
  },
  {
    name: 'Pisces',
    latinName: 'Pisces',
    abbreviation: 'Psc',
    brightestStar: 'Eta Piscium',
    description: 'The Fishes - two fish connected by a ribbon, marking the vernal equinox point.',
    mythology: 'Aphrodite and Eros transformed into fish to escape the monster Typhon.',
    direction: 'S',
    bestViewingMonths: [10, 11, 12, 1],
    bestViewingTime: '9 PM - 2 AM',
    difficulty: 'challenging',
    rightAscension: 0.5,
    declination: 10
  },
  {
    name: 'Aries',
    latinName: 'Aries',
    abbreviation: 'Ari',
    brightestStar: 'Hamal',
    description: 'The Ram - a small constellation with ancient astrological significance.',
    mythology: 'The golden-fleeced ram that rescued Phrixus and Helle.',
    direction: 'E',
    bestViewingMonths: [10, 11, 12, 1, 2],
    bestViewingTime: '9 PM - 3 AM',
    difficulty: 'moderate',
    rightAscension: 2.5,
    declination: 20
  },
  {
    name: 'Scorpius',
    latinName: 'Scorpius',
    abbreviation: 'Sco',
    brightestStar: 'Antares',
    description: 'The Scorpion - features red supergiant Antares, rival of Mars.',
    mythology: 'The scorpion that killed Orion, placed opposite him in the sky.',
    direction: 'S',
    bestViewingMonths: [6, 7, 8],
    bestViewingTime: '10 PM - 2 AM',
    difficulty: 'easy',
    rightAscension: 16.5,
    declination: -25
  },
  {
    name: 'Sagittarius',
    latinName: 'Sagittarius',
    abbreviation: 'Sgr',
    brightestStar: 'Kaus Australis',
    description: 'The Archer - points toward the Milky Way\'s center, rich in deep-sky objects.',
    mythology: 'A centaur archer, sometimes identified as Chiron.',
    direction: 'S',
    bestViewingMonths: [7, 8, 9],
    bestViewingTime: '10 PM - 2 AM',
    difficulty: 'easy',
    rightAscension: 19,
    declination: -25
  },
  {
    name: 'Capricornus',
    latinName: 'Capricornus',
    abbreviation: 'Cap',
    brightestStar: 'Deneb Algedi',
    description: 'The Sea-Goat - an ancient constellation depicting a goat with a fish tail.',
    mythology: 'Pan transformed into a fish-goat to escape the monster Typhon.',
    direction: 'S',
    bestViewingMonths: [8, 9, 10],
    bestViewingTime: '10 PM - 2 AM',
    difficulty: 'challenging',
    rightAscension: 21,
    declination: -15
  },
  {
    name: 'Aquila',
    latinName: 'Aquila',
    abbreviation: 'Aql',
    brightestStar: 'Altair',
    description: 'The Eagle - contains Altair, part of the Summer Triangle.',
    mythology: 'The eagle that carried Zeus\'s thunderbolts.',
    direction: 'S',
    bestViewingMonths: [7, 8, 9, 10],
    bestViewingTime: '10 PM - 3 AM',
    difficulty: 'easy',
    rightAscension: 19.5,
    declination: 5
  },
  {
    name: 'Corona Borealis',
    latinName: 'Corona Borealis',
    abbreviation: 'CrB',
    brightestStar: 'Alphecca',
    description: 'The Northern Crown - a small but distinctive semicircular arc of stars.',
    mythology: 'The crown of Ariadne, given by Dionysus and placed in the sky.',
    direction: 'E',
    bestViewingMonths: [4, 5, 6, 7, 8],
    bestViewingTime: '10 PM - 3 AM',
    difficulty: 'moderate',
    rightAscension: 15.75,
    declination: 30
  },
  {
    name: 'Hercules',
    latinName: 'Hercules',
    abbreviation: 'Her',
    brightestStar: 'Kornephoros',
    description: 'The Hero - the fifth-largest constellation, contains the Great Globular Cluster M13.',
    mythology: 'The legendary Greek hero who completed twelve labors.',
    direction: 'overhead',
    bestViewingMonths: [5, 6, 7, 8, 9],
    bestViewingTime: '10 PM - 3 AM',
    difficulty: 'moderate',
    rightAscension: 17,
    declination: 30
  },
  {
    name: 'Ophiuchus',
    latinName: 'Ophiuchus',
    abbreviation: 'Oph',
    brightestStar: 'Rasalhague',
    description: 'The Serpent Bearer - a large constellation straddling the celestial equator.',
    mythology: 'Asclepius, the healer, holding a serpent representing medicine.',
    direction: 'S',
    bestViewingMonths: [6, 7, 8],
    bestViewingTime: '10 PM - 2 AM',
    difficulty: 'moderate',
    rightAscension: 17.5,
    declination: 0
  },
  {
    name: 'Libra',
    latinName: 'Libra',
    abbreviation: 'Lib',
    brightestStar: 'Zubeneschamali',
    description: 'The Scales - the only zodiac constellation representing an inanimate object.',
    mythology: 'The scales of justice held by Astraea, goddess of justice.',
    direction: 'S',
    bestViewingMonths: [5, 6, 7],
    bestViewingTime: '10 PM - 2 AM',
    difficulty: 'moderate',
    rightAscension: 15,
    declination: -15
  },
  {
    name: 'Corvus',
    latinName: 'Corvus',
    abbreviation: 'Crv',
    brightestStar: 'Gienah',
    description: 'The Crow - a compact quadrilateral of stars, easy spring target.',
    mythology: 'Apollo\'s sacred crow, turned black for bringing bad news.',
    direction: 'S',
    bestViewingMonths: [3, 4, 5, 6],
    bestViewingTime: '10 PM - 2 AM',
    difficulty: 'easy',
    rightAscension: 12.5,
    declination: -18
  },
  {
    name: 'Crater',
    latinName: 'Crater',
    abbreviation: 'Crt',
    brightestStar: 'Labrum',
    description: 'The Cup - a faint constellation representing Apollo\'s goblet.',
    mythology: 'The cup Apollo used to hold water, placed near Corvus the crow.',
    direction: 'S',
    bestViewingMonths: [3, 4, 5],
    bestViewingTime: '10 PM - 2 AM',
    difficulty: 'challenging',
    rightAscension: 11.5,
    declination: -15
  },
  {
    name: 'Canis Minor',
    latinName: 'Canis Minor',
    abbreviation: 'CMi',
    brightestStar: 'Procyon',
    description: 'The Lesser Dog - small but contains brilliant Procyon, 8th brightest star.',
    mythology: 'Orion\'s smaller hunting dog, faithful companion in the sky.',
    direction: 'E',
    bestViewingMonths: [12, 1, 2, 3, 4],
    bestViewingTime: '9 PM - 3 AM',
    difficulty: 'easy',
    rightAscension: 7.5,
    declination: 5
  },
  {
    name: 'Monoceros',
    latinName: 'Monoceros',
    abbreviation: 'Mon',
    brightestStar: 'Beta Monocerotis',
    description: 'The Unicorn - faint but contains beautiful star clusters in the Milky Way.',
    mythology: 'A 17th-century addition to fill the gap between Orion and Canis Major.',
    direction: 'S',
    bestViewingMonths: [1, 2, 3],
    bestViewingTime: '9 PM - 2 AM',
    difficulty: 'challenging',
    rightAscension: 7,
    declination: 0
  },
  {
    name: 'Lepus',
    latinName: 'Lepus',
    abbreviation: 'Lep',
    brightestStar: 'Arneb',
    description: 'The Hare - crouches below Orion\'s feet, hunted by his dogs.',
    mythology: 'The hare that Orion hunts eternally across the night sky.',
    direction: 'S',
    bestViewingMonths: [12, 1, 2, 3],
    bestViewingTime: '9 PM - 1 AM',
    difficulty: 'moderate',
    rightAscension: 5.5,
    declination: -20
  },
  {
    name: 'Eridanus',
    latinName: 'Eridanus',
    abbreviation: 'Eri',
    brightestStar: 'Achernar',
    description: 'The River - the sixth-largest constellation, winding from Orion southward.',
    mythology: 'The celestial river into which Phaethon fell after losing control of the sun chariot.',
    direction: 'SW',
    bestViewingMonths: [11, 12, 1, 2],
    bestViewingTime: '9 PM - 1 AM',
    difficulty: 'challenging',
    rightAscension: 3.5,
    declination: -30
  },
  {
    name: 'Cetus',
    latinName: 'Cetus',
    abbreviation: 'Cet',
    brightestStar: 'Diphda',
    description: 'The Sea Monster - large autumn constellation containing variable star Mira.',
    mythology: 'The sea monster sent to devour Andromeda, slain by Perseus.',
    direction: 'S',
    bestViewingMonths: [10, 11, 12, 1],
    bestViewingTime: '9 PM - 2 AM',
    difficulty: 'moderate',
    rightAscension: 1.5,
    declination: -10
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
