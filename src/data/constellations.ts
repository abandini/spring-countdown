/**
 * Constellation data and visibility calculations
 * Focused on Northern Hemisphere winter/spring viewing
 * Star patterns sourced from d3-celestial (https://github.com/ofrohn/d3-celestial)
 */

export interface StarPoint {
  x: number;        // 0-100 normalized position
  y: number;        // 0-100 normalized position
  size: number;     // Star brightness (1-5)
  label?: string;   // Optional star name
}

export interface StarPattern {
  stars: StarPoint[];
  lines: [number, number][];  // Pairs of star indices to connect
}

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
  starPattern?: StarPattern;    // SVG-ready star map data
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
    declination: 0,
    starPattern: {
      stars: [
        { x: 25, y: 15, size: 5, label: 'Betelgeuse' },  // 0 - red supergiant shoulder
        { x: 75, y: 15, size: 3, label: 'Bellatrix' },   // 1 - shoulder
        { x: 35, y: 45, size: 3 },                        // 2 - belt left (Alnitak)
        { x: 50, y: 43, size: 3 },                        // 3 - belt middle (Alnilam)
        { x: 65, y: 41, size: 3 },                        // 4 - belt right (Mintaka)
        { x: 20, y: 85, size: 4 },                        // 5 - knee left (Saiph)
        { x: 80, y: 85, size: 5, label: 'Rigel' },       // 6 - knee right (Rigel)
        { x: 50, y: 55, size: 2 },                        // 7 - sword nebula area
      ],
      lines: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [3, 7]]
    }
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
    declination: 55,
    starPattern: {
      stars: [
        { x: 15, y: 30, size: 4, label: 'Dubhe' },       // 0 - pointer star
        { x: 30, y: 25, size: 4, label: 'Merak' },       // 1 - pointer star
        { x: 45, y: 35, size: 3 },                        // 2 - bowl
        { x: 55, y: 45, size: 4, label: 'Megrez' },      // 3 - bowl corner
        { x: 70, y: 40, size: 5, label: 'Alioth' },      // 4 - handle
        { x: 80, y: 50, size: 4, label: 'Mizar' },       // 5 - handle
        { x: 90, y: 60, size: 3, label: 'Alkaid' },      // 6 - handle end
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]]
    }
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
    declination: 60,
    starPattern: {
      stars: [
        { x: 10, y: 40, size: 4, label: 'Caph' },        // 0 - beta
        { x: 30, y: 60, size: 5, label: 'Schedar' },     // 1 - alpha
        { x: 50, y: 35, size: 3, label: 'Gamma' },       // 2 - gamma (center)
        { x: 70, y: 65, size: 3, label: 'Ruchbah' },     // 3 - delta
        { x: 90, y: 45, size: 3, label: 'Segin' },       // 4 - epsilon
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
    }
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
    declination: 22,
    starPattern: {
      stars: [
        { x: 20, y: 10, size: 4, label: 'Castor' },      // 0 - twin head
        { x: 35, y: 15, size: 5, label: 'Pollux' },      // 1 - twin head
        { x: 25, y: 35, size: 2 },                        // 2 - body
        { x: 40, y: 40, size: 2 },                        // 3 - body
        { x: 30, y: 55, size: 2 },                        // 4 - body
        { x: 45, y: 60, size: 2 },                        // 5 - body
        { x: 20, y: 80, size: 3, label: 'Alhena' },      // 6 - foot
        { x: 55, y: 85, size: 2 },                        // 7 - foot
      ],
      lines: [[0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [2, 3], [4, 5]]
    }
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
    declination: 16,
    starPattern: {
      stars: [
        { x: 45, y: 45, size: 5, label: 'Aldebaran' },   // 0 - eye (red giant)
        { x: 35, y: 35, size: 2 },                        // 1 - face V
        { x: 55, y: 35, size: 2 },                        // 2 - face V
        { x: 25, y: 25, size: 2 },                        // 3 - face V
        { x: 65, y: 25, size: 2 },                        // 4 - face V
        { x: 10, y: 20, size: 3, label: 'El Nath' },     // 5 - horn tip
        { x: 85, y: 15, size: 2 },                        // 6 - horn tip
        { x: 80, y: 70, size: 2, label: 'Pleiades' },    // 7 - Pleiades cluster
      ],
      lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6]]
    }
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
    declination: 15,
    starPattern: {
      stars: [
        { x: 20, y: 70, size: 5, label: 'Regulus' },     // 0 - heart (brightest)
        { x: 25, y: 50, size: 3 },                        // 1 - sickle
        { x: 35, y: 35, size: 3 },                        // 2 - sickle
        { x: 50, y: 25, size: 4, label: 'Algieba' },     // 3 - mane
        { x: 45, y: 15, size: 2 },                        // 4 - head
        { x: 55, y: 55, size: 2 },                        // 5 - body
        { x: 80, y: 60, size: 4, label: 'Denebola' },    // 6 - tail
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6], [0, 5]]
    }
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
    declination: -20,
    starPattern: {
      stars: [
        { x: 50, y: 20, size: 5, label: 'Sirius' },      // 0 - brightest star!
        { x: 35, y: 45, size: 3 },                        // 1 - chest
        { x: 65, y: 50, size: 3 },                        // 2 - haunch
        { x: 25, y: 70, size: 2 },                        // 3 - front leg
        { x: 75, y: 75, size: 3, label: 'Aludra' },      // 4 - back leg
        { x: 55, y: 65, size: 2 },                        // 5 - body
        { x: 40, y: 35, size: 2, label: 'Mirzam' },      // 6 - neck
      ],
      lines: [[0, 6], [6, 1], [1, 3], [1, 5], [5, 2], [2, 4]]
    }
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
    declination: 38,
    starPattern: {
      stars: [
        { x: 10, y: 50, size: 4, label: 'Alpheratz' },     // 0 - shared with Pegasus Square
        { x: 30, y: 45, size: 3, label: 'Mirach' },        // 1 - step to galaxy
        { x: 50, y: 40, size: 3, label: 'Almach' },        // 2 - double star
        { x: 70, y: 35, size: 2 },                          // 3 - arm extension
        { x: 35, y: 25, size: 2 },                          // 4 - leg
        { x: 25, y: 60, size: 2 },                          // 5 - other leg
        { x: 40, y: 30, size: 1, label: 'M31' },           // 6 - Andromeda Galaxy!
      ],
      lines: [[0, 1], [1, 2], [2, 3], [1, 4], [0, 5], [1, 6]]
    }
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
    declination: 42,
    starPattern: {
      stars: [
        { x: 50, y: 10, size: 5, label: 'Deneb' },       // 0 - tail (bright!)
        { x: 50, y: 35, size: 3 },                        // 1 - body
        { x: 50, y: 55, size: 4, label: 'Sadr' },        // 2 - heart (center cross)
        { x: 25, y: 55, size: 3, label: 'Gienah' },      // 3 - wing
        { x: 75, y: 55, size: 3 },                        // 4 - wing
        { x: 50, y: 90, size: 4, label: 'Albireo' },     // 5 - beak (double star!)
      ],
      lines: [[0, 1], [1, 2], [2, 5], [2, 3], [2, 4]]
    }
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
    declination: 36,
    starPattern: {
      stars: [
        { x: 50, y: 10, size: 5, label: 'Vega' },          // 0 - brilliant blue star!
        { x: 35, y: 55, size: 2 },                          // 1 - parallelogram
        { x: 65, y: 55, size: 2 },                          // 2 - parallelogram
        { x: 30, y: 80, size: 2 },                          // 3 - parallelogram
        { x: 70, y: 80, size: 2 },                          // 4 - parallelogram
      ],
      lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 2]]
    }
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
    declination: 30,
    starPattern: {
      // Kite-shaped constellation
      stars: [
        { x: 50, y: 90, size: 5, label: 'Arcturus' },      // 0 - brilliant orange star!
        { x: 35, y: 60, size: 3 },                          // 1 - kite left
        { x: 65, y: 60, size: 3 },                          // 2 - kite right
        { x: 50, y: 35, size: 3, label: 'Nekkar' },        // 3 - kite top
        { x: 40, y: 20, size: 2 },                          // 4 - head left
        { x: 60, y: 20, size: 2 },                          // 5 - head right
        { x: 50, y: 10, size: 3, label: 'Izar' },          // 6 - head top
      ],
      lines: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]]
    }
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
    declination: -5,
    starPattern: {
      // Y-shaped with Spica at the base
      stars: [
        { x: 50, y: 90, size: 5, label: 'Spica' },         // 0 - brilliant blue-white!
        { x: 50, y: 65, size: 3 },                          // 1 - torso
        { x: 45, y: 45, size: 3, label: 'Porrima' },       // 2 - double star
        { x: 30, y: 25, size: 3, label: 'Vindemiatrix' },  // 3 - arm
        { x: 65, y: 30, size: 2 },                          // 4 - arm
        { x: 55, y: 55, size: 2 },                          // 5 - body
        { x: 70, y: 50, size: 2 },                          // 6 - body extension
      ],
      lines: [[0, 1], [1, 2], [2, 3], [2, 4], [1, 5], [5, 6]]
    }
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
    declination: 75,
    starPattern: {
      stars: [
        { x: 90, y: 20, size: 5, label: 'Polaris' },       // 0 - North Star!
        { x: 75, y: 35, size: 2 },                          // 1 - handle
        { x: 60, y: 45, size: 3, label: 'Kochab' },        // 2 - handle/bowl
        { x: 45, y: 55, size: 2 },                          // 3 - bowl
        { x: 55, y: 70, size: 2 },                          // 4 - bowl
        { x: 40, y: 75, size: 2 },                          // 5 - bowl
        { x: 30, y: 60, size: 3, label: 'Pherkad' },       // 6 - bowl corner
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]]
    }
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
    declination: 20,
    starPattern: {
      stars: [
        { x: 20, y: 20, size: 4, label: 'Scheat' },        // 0 - Great Square corner
        { x: 80, y: 20, size: 4, label: 'Markab' },        // 1 - Great Square corner
        { x: 80, y: 70, size: 4, label: 'Algenib' },       // 2 - Great Square corner
        { x: 20, y: 70, size: 4, label: 'Alpheratz' },     // 3 - shared w/ Andromeda
        { x: 10, y: 50, size: 4, label: 'Enif' },          // 4 - nose (brightest)
        { x: 95, y: 45, size: 2 },                          // 5 - neck extension
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 5]]
    }
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
    declination: -25,
    starPattern: {
      stars: [
        { x: 15, y: 20, size: 3 },                          // 0 - head/claw
        { x: 25, y: 15, size: 2 },                          // 1 - head
        { x: 35, y: 20, size: 2 },                          // 2 - head
        { x: 40, y: 30, size: 5, label: 'Antares' },       // 3 - heart (red!)
        { x: 50, y: 45, size: 3 },                          // 4 - body
        { x: 55, y: 60, size: 2 },                          // 5 - body
        { x: 65, y: 75, size: 3, label: 'Shaula' },        // 6 - tail
        { x: 75, y: 85, size: 3, label: 'Lesath' },        // 7 - stinger
        { x: 10, y: 30, size: 2 },                          // 8 - claw
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [0, 8]]
    }
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
    declination: -25,
    starPattern: {
      // The Teapot asterism - easy to spot!
      stars: [
        { x: 25, y: 40, size: 3 },                          // 0 - lid top
        { x: 30, y: 55, size: 3 },                          // 1 - lid bottom
        { x: 45, y: 55, size: 3 },                          // 2 - top of pot
        { x: 60, y: 55, size: 3 },                          // 3 - top right
        { x: 70, y: 70, size: 3, label: 'Kaus Australis' }, // 4 - handle
        { x: 55, y: 80, size: 3 },                          // 5 - bottom right
        { x: 35, y: 80, size: 3 },                          // 6 - bottom left
        { x: 20, y: 70, size: 3 },                          // 7 - spout
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 1], [6, 2]]
    }
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
    declination: 5,
    starPattern: {
      stars: [
        { x: 50, y: 30, size: 5, label: 'Altair' },        // 0 - brilliant! Summer Triangle
        { x: 35, y: 25, size: 3, label: 'Tarazed' },       // 1 - shoulder
        { x: 65, y: 25, size: 3, label: 'Alshain' },       // 2 - shoulder
        { x: 50, y: 10, size: 2 },                          // 3 - head
        { x: 25, y: 50, size: 2 },                          // 4 - wing tip
        { x: 75, y: 50, size: 2 },                          // 5 - wing tip
        { x: 50, y: 70, size: 2 },                          // 6 - tail
      ],
      lines: [[0, 1], [0, 2], [0, 3], [1, 4], [2, 5], [0, 6]]
    }
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
    declination: 30,
    starPattern: {
      // Distinctive crown/semicircle
      stars: [
        { x: 10, y: 50, size: 2 },                          // 0 - crown edge
        { x: 25, y: 30, size: 3 },                          // 1 - crown
        { x: 45, y: 20, size: 2 },                          // 2 - crown
        { x: 55, y: 20, size: 4, label: 'Alphecca' },      // 3 - gem (brightest)
        { x: 70, y: 25, size: 2 },                          // 4 - crown
        { x: 85, y: 40, size: 2 },                          // 5 - crown
        { x: 90, y: 55, size: 2 },                          // 6 - crown edge
      ],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
    }
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
    declination: 5,
    starPattern: {
      // Simple - just two main stars
      stars: [
        { x: 30, y: 40, size: 5, label: 'Procyon' },       // 0 - 8th brightest star!
        { x: 70, y: 55, size: 2, label: 'Gomeisa' },       // 1 - beta
      ],
      lines: [[0, 1]]
    }
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
