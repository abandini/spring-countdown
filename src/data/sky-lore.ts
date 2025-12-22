/**
 * Ancient astronomy, sky lore, and celestial wisdom
 * Daily rotating content about historical observations and traditions
 */

export interface SkyLore {
  id: string;
  title: string;
  content: string;
  culture: string;
  category: 'solstice' | 'equinox' | 'stars' | 'moon' | 'planets' | 'seasons' | 'traditions';
  relevantMonths: number[];  // 1-12, when this lore is most relevant
  source?: string;
}

export interface AstronomicalEvent {
  name: string;
  date: Date;
  description: string;
  type: 'meteor_shower' | 'eclipse' | 'conjunction' | 'opposition' | 'solstice' | 'equinox' | 'supermoon';
}

// Collection of sky lore from various cultures
export const SKY_LORE: SkyLore[] = [
  // Winter Solstice Traditions
  {
    id: 'sol-001',
    title: 'Yule: The Return of Light',
    content: 'Ancient Germanic peoples celebrated Yule around the winter solstice, burning a Yule log that could take 12 days to burn completely. They believed the sun stood still for 12 days, and the log\'s fire would entice the sun to return.',
    culture: 'Norse/Germanic',
    category: 'solstice',
    relevantMonths: [12, 1],
  },
  {
    id: 'sol-002',
    title: 'Dongzhi Festival',
    content: 'In Chinese tradition, the winter solstice (Dongzhi) marks when yin energy peaks and yang begins its return. Families gather to eat tangyuan (sweet rice balls), symbolizing reunion and the coming warmth.',
    culture: 'Chinese',
    category: 'solstice',
    relevantMonths: [12],
  },
  {
    id: 'sol-003',
    title: 'Stonehenge\'s Ancient Alignment',
    content: 'Stonehenge was precisely aligned so that on winter solstice sunset, light passes through the trilithon entrance. For Neolithic peoples, this marked the symbolic death and rebirth of the sun.',
    culture: 'Neolithic Britain',
    category: 'solstice',
    relevantMonths: [12],
  },
  {
    id: 'sol-004',
    title: 'Inti Raymi: Festival of the Sun',
    content: 'The Inca celebrated the June solstice (winter in the Southern Hemisphere) with Inti Raymi, honoring Inti, the sun god. They believed the sun was closest to Earth and needed ceremonies to ensure its return.',
    culture: 'Inca',
    category: 'solstice',
    relevantMonths: [6, 12],
  },

  // Spring Equinox Traditions
  {
    id: 'eq-001',
    title: 'Nowruz: Persian New Year',
    content: 'For over 3,000 years, Persians have celebrated Nowruz on the spring equinox. The Haft-sin table with seven symbolic items represents rebirth, and families leap over bonfires to burn away the old year.',
    culture: 'Persian',
    category: 'equinox',
    relevantMonths: [3],
  },
  {
    id: 'eq-002',
    title: 'Higan: Crossing to the Other Shore',
    content: 'Japanese Buddhists observe Higan during both equinoxes, visiting family graves and reflecting on the Buddhist path. The equal day and night symbolize balance between the worlds of the living and dead.',
    culture: 'Japanese',
    category: 'equinox',
    relevantMonths: [3, 9],
  },
  {
    id: 'eq-003',
    title: 'The Serpent of Kukulkan',
    content: 'At Chichen Itza, the spring equinox creates a shadow serpent that slithers down the pyramid\'s steps. This optical illusion represented the feathered serpent god Kukulkan descending to Earth.',
    culture: 'Maya',
    category: 'equinox',
    relevantMonths: [3],
  },
  {
    id: 'eq-004',
    title: 'Ostara and the Hare',
    content: 'The Germanic goddess Ēostre, celebrated at the spring equinox, may have given us the word "Easter." Her symbols—the hare and eggs—represented fertility and new life.',
    culture: 'Anglo-Saxon',
    category: 'equinox',
    relevantMonths: [3],
  },

  // Star Lore
  {
    id: 'star-001',
    title: 'Orion: The Eternal Hunter',
    content: 'Nearly every ancient culture had a story for Orion. To the Greeks, he was a hunter slain by a scorpion; to the Egyptians, he was Osiris, god of the afterlife; to the Lakota, the belt stars were a bison\'s backbone.',
    culture: 'Multiple',
    category: 'stars',
    relevantMonths: [12, 1, 2, 3],
  },
  {
    id: 'star-002',
    title: 'The Pleiades: Seven Sisters',
    content: 'The Pleiades star cluster appears in the mythology of cultures worldwide. Greeks saw the seven daughters of Atlas; the Maori called them Matariki and used their rising to mark the new year; the Cherokee saw them as children who danced into the sky.',
    culture: 'Multiple',
    category: 'stars',
    relevantMonths: [11, 12, 1, 2],
  },
  {
    id: 'star-003',
    title: 'Polaris: The Unmoving Star',
    content: 'The North Star (Polaris) was crucial for navigation. Vikings called it the "Lodestar," and escaped slaves followed it north on the Underground Railroad. It appears to stand still while all other stars wheel around it.',
    culture: 'Multiple',
    category: 'stars',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'star-004',
    title: 'Sirius: The Dog Star',
    content: 'Ancient Egyptians based their calendar on Sirius\'s heliacal rising, which predicted the Nile\'s annual flood. The "dog days of summer" get their name from Sirius rising with the sun in late July.',
    culture: 'Egyptian',
    category: 'stars',
    relevantMonths: [1, 2, 7, 8],
  },

  // Moon Lore
  {
    id: 'moon-001',
    title: 'The Hare in the Moon',
    content: 'While Western cultures see a "Man in the Moon," East Asian, Mesoamerican, and indigenous cultures worldwide see a hare or rabbit. In Chinese legend, the Jade Rabbit pounds the elixir of immortality.',
    culture: 'East Asian',
    category: 'moon',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'moon-002',
    title: 'Full Moon Names',
    content: 'Native American tribes named each full moon: Wolf Moon (January), Snow Moon (February), Worm Moon (March), Pink Moon (April). These names tracked seasonal changes crucial for survival.',
    culture: 'Native American',
    category: 'moon',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'moon-003',
    title: 'Lunar Gardening',
    content: 'Ancient farmers planted by the moon\'s phases: leafy crops during the waxing moon (increasing light), root crops during the waning moon. Modern biodynamic farming still follows these principles.',
    culture: 'Multiple',
    category: 'moon',
    relevantMonths: [3, 4, 5, 6],
  },

  // Planetary Lore
  {
    id: 'planet-001',
    title: 'Venus: Morning and Evening Star',
    content: 'Ancient peoples often thought Venus was two stars: Phosphorus (morning) and Hesperus (evening). The Maya tracked Venus\'s 584-day cycle with remarkable precision and timed wars to its appearances.',
    culture: 'Maya/Greek',
    category: 'planets',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'planet-002',
    title: 'The Wandering Stars',
    content: 'Ancient Greeks called planets "wandering stars" (planetes) because they moved against the fixed stars. Each visible planet was associated with a god: Mercury (Hermes), Venus (Aphrodite), Mars (Ares), Jupiter (Zeus), Saturn (Kronos).',
    culture: 'Greek/Roman',
    category: 'planets',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },

  // Seasonal Lore
  {
    id: 'season-001',
    title: 'Groundhog Day\'s Ancient Roots',
    content: 'The tradition of a creature predicting spring\'s arrival dates to Celtic Imbolc and Germanic Candlemas. In Europe, bears or badgers were the prognosticators before American settlers chose the groundhog.',
    culture: 'Celtic/Germanic',
    category: 'seasons',
    relevantMonths: [2],
  },
  {
    id: 'season-002',
    title: 'The First Robin',
    content: 'In many cultures, the first robin of spring is considered lucky. European folklore said robins got their red breast from trying to remove thorns from Christ\'s crown or from fanning flames to warm the baby Jesus.',
    culture: 'European',
    category: 'seasons',
    relevantMonths: [2, 3, 4],
  },
  {
    id: 'season-003',
    title: 'Counting the Cranes',
    content: 'In Japan, the return of cranes marks the transition to spring. Ancient haiku poets counted crane arrivals, and the birds symbolize longevity—a thousand paper cranes (senbazuru) grant a wish.',
    culture: 'Japanese',
    category: 'seasons',
    relevantMonths: [2, 3],
  },

  // Additional Star Lore
  {
    id: 'star-005',
    title: 'The Big Dipper as Timekeeper',
    content: 'Before clocks, farmers told time by the Big Dipper\'s rotation around Polaris. The "pointer stars" helped find north, and its position indicated both the hour of night and season of the year.',
    culture: 'Multiple',
    category: 'stars',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'star-006',
    title: 'Betelgeuse: The Armpit of the Giant',
    content: 'Betelgeuse comes from Arabic "yad al-jawzā" meaning "hand of Orion," mistranslated as "armpit." This red supergiant is so large that if placed at our Sun\'s position, it would engulf Mars.',
    culture: 'Arabic/Greek',
    category: 'stars',
    relevantMonths: [12, 1, 2, 3],
  },
  {
    id: 'star-007',
    title: 'The Southern Cross',
    content: 'The Southern Cross guided Polynesian navigators across the Pacific. When its long axis points down, it indicates due south. Five nations feature it on their flags, including Australia and New Zealand.',
    culture: 'Polynesian',
    category: 'stars',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'star-008',
    title: 'Vega and the Weaving Maiden',
    content: 'In Chinese legend, Vega is Zhinü, a weaving maiden separated from her cowherd lover Altair by the Milky Way. They reunite once yearly on the 7th day of the 7th month—celebrated as Qixi Festival.',
    culture: 'Chinese',
    category: 'stars',
    relevantMonths: [7, 8, 9],
  },
  {
    id: 'star-009',
    title: 'Canopus: Ship of the Desert',
    content: 'Canopus, the second-brightest star, guided desert caravans across Arabia. Named after the navigator of Menelaus\'s ship, it remains important for spacecraft navigation today.',
    culture: 'Arabic',
    category: 'stars',
    relevantMonths: [1, 2],
  },
  {
    id: 'star-010',
    title: 'The Milky Way as Celestial River',
    content: 'Many cultures saw the Milky Way as a great river. The Egyptians called it the celestial Nile; to the Maya, it was a road to the underworld; Aboriginal Australians saw it as a river filled with water lilies.',
    culture: 'Multiple',
    category: 'stars',
    relevantMonths: [6, 7, 8, 9],
  },

  // Additional Moon Lore
  {
    id: 'moon-004',
    title: 'The Moon and Tides',
    content: 'Ancient fishermen knew the moon controlled tides. The highest "spring tides" occur during full and new moons when the sun and moon align. The lowest "neap tides" happen at quarter moons.',
    culture: 'Multiple',
    category: 'moon',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'moon-005',
    title: 'Eclipse Dragons',
    content: 'Many cultures believed dragons ate the moon during eclipses. In China, people banged drums and pots to scare the dragon away. Vikings blamed wolves; Hindu mythology blamed the demon Rahu.',
    culture: 'Multiple',
    category: 'moon',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'moon-006',
    title: 'Harvest Moon Magic',
    content: 'The Harvest Moon—the full moon nearest the autumn equinox—rises at sunset for several nights, providing extra light for farmers gathering crops. Its orange color comes from viewing it through more atmosphere.',
    culture: 'Multiple',
    category: 'moon',
    relevantMonths: [9, 10],
  },
  {
    id: 'moon-007',
    title: 'Blue Moon Rarity',
    content: 'A "blue moon" originally meant an extra full moon in a season (usually three, occasionally four). The phrase "once in a blue moon" reflects its rarity—about every 2.7 years.',
    culture: 'European',
    category: 'moon',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'moon-008',
    title: 'Moonbow Wonder',
    content: 'A moonbow is a rainbow produced by moonlight rather than sunlight. They appear white to the human eye because moonlight is too dim to activate our color vision, but cameras reveal their true colors.',
    culture: 'Modern',
    category: 'moon',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },

  // Additional Solstice/Equinox Lore
  {
    id: 'sol-005',
    title: 'Saturnalia: Roman Winter Festival',
    content: 'Romans celebrated Saturnalia around the winter solstice with gift-giving, candles, and role reversals where masters served slaves. Many Christmas traditions derive from this ancient festival.',
    culture: 'Roman',
    category: 'solstice',
    relevantMonths: [12],
  },
  {
    id: 'sol-006',
    title: 'Soyal: Hopi Winter Ceremony',
    content: 'The Hopi people of Arizona perform Soyal ceremonies at winter solstice to welcome kachina spirits and ensure the sun\'s return. Prayer sticks are made and the Great Plumed Serpent is honored.',
    culture: 'Hopi',
    category: 'solstice',
    relevantMonths: [12],
  },
  {
    id: 'sol-007',
    title: 'Lucia: Bringer of Light',
    content: 'On December 13th, Swedish girls don white gowns and crowns of candles to embody Saint Lucia, bringing light to the darkest season. The tradition began when Sweden used the Julian calendar, placing Lucia on the solstice.',
    culture: 'Swedish',
    category: 'solstice',
    relevantMonths: [12],
  },
  {
    id: 'sol-008',
    title: 'Shab-e Yalda: Night of Birth',
    content: 'Iranians celebrate Yalda Night on winter solstice—the longest night—by staying awake with family, eating pomegranates and watermelon, and reading poetry. Light and red fruit symbolize the sun\'s rebirth.',
    culture: 'Persian',
    category: 'solstice',
    relevantMonths: [12],
  },
  {
    id: 'eq-005',
    title: 'Sham el-Nessim: Smelling the Breeze',
    content: 'Egyptians have celebrated spring since pharaonic times with Sham el-Nessim, a festival dating back 4,500 years. Families picnic outdoors, eating salted fish and colored eggs—precursors to Easter eggs.',
    culture: 'Egyptian',
    category: 'equinox',
    relevantMonths: [3, 4],
  },
  {
    id: 'eq-006',
    title: 'Holi: Festival of Colors',
    content: 'The Hindu festival of Holi celebrates spring with bonfires and throwing of colored powders. It commemorates divine love and the triumph of good over evil, as people forgive grudges and renew relationships.',
    culture: 'Hindu',
    category: 'equinox',
    relevantMonths: [3],
  },

  // Planetary Lore
  {
    id: 'planet-003',
    title: 'Mars: The War God\'s Wanderings',
    content: 'Mars\'s red color led ancient cultures to associate it with blood and war. Its retrograde motion—appearing to move backward—puzzled astronomers until Copernicus explained Earth "overtakes" Mars.',
    culture: 'Multiple',
    category: 'planets',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'planet-004',
    title: 'Jupiter\'s Galilean Moons',
    content: 'When Galileo discovered Jupiter\'s four largest moons in 1610, it challenged the belief that everything orbited Earth. The moons—Io, Europa, Ganymede, and Callisto—are named for Jupiter/Zeus\'s lovers.',
    culture: 'Greek/Modern',
    category: 'planets',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'planet-005',
    title: 'Saturn\'s Rings of Wonder',
    content: 'Galileo thought Saturn had "ears." Only later did astronomers realize these were rings. The rings are mostly water ice, and despite appearing solid, you could fit 700 Earths within them.',
    culture: 'Modern',
    category: 'planets',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'planet-006',
    title: 'Mercury: The Trickster',
    content: 'Mercury\'s quick movement across the sky led Romans to name it after their messenger god. It completes an orbit in just 88 Earth days. Ancient peoples sometimes mistook it for two different stars.',
    culture: 'Roman',
    category: 'planets',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },

  // Traditions
  {
    id: 'trad-001',
    title: 'Wishing on Stars',
    content: 'The tradition of wishing on shooting stars may come from Greek astronomer Ptolemy, who believed gods occasionally peered down at Earth, and stars slipped through. Making a wish during this moment of divine attention would be heard.',
    culture: 'Greek',
    category: 'traditions',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'trad-002',
    title: 'The Christmas Star',
    content: 'The Star of Bethlehem may have been a conjunction of Jupiter and Saturn in 7 BCE, a nova, or a comet. Johannes Kepler calculated that such conjunctions occur roughly every 800 years.',
    culture: 'Christian',
    category: 'traditions',
    relevantMonths: [12],
  },
  {
    id: 'trad-003',
    title: 'Aboriginal Star Maps',
    content: 'Australian Aboriginal people have observed the sky for over 65,000 years—the world\'s oldest astronomical tradition. They mapped the dark spaces between stars as well as the stars themselves, seeing emus and other animals.',
    culture: 'Aboriginal Australian',
    category: 'traditions',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'trad-004',
    title: 'Zodiac Origins',
    content: 'The zodiac was created by Babylonians around 500 BCE, dividing the sun\'s path into twelve 30-degree segments. The word comes from Greek "zōidiakos"—circle of animals. Precession has shifted the constellations since.',
    culture: 'Babylonian',
    category: 'traditions',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'trad-005',
    title: 'Dark Sky Reserves',
    content: 'Light pollution has hidden the Milky Way from one-third of humanity. Dark Sky Reserves protect the night sky as natural heritage. The best views now require travel to remote areas—a reversal of ancient times when stars guided travelers everywhere.',
    culture: 'Modern',
    category: 'traditions',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },

  // Additional Seasonal Lore
  {
    id: 'season-004',
    title: 'Swallows of San Juan Capistrano',
    content: 'Each spring, cliff swallows return to California\'s Mission San Juan Capistrano around March 19th, the feast of St. Joseph. Their departure around October 23rd marks the approaching winter.',
    culture: 'Spanish Colonial',
    category: 'seasons',
    relevantMonths: [3, 10],
  },
  {
    id: 'season-005',
    title: 'Punxsutawney Phil\'s Forecast',
    content: 'Since 1887, Punxsutawney Phil has "predicted" winter\'s end on February 2nd. If he sees his shadow, six more weeks of winter; if not, early spring. His accuracy rate is about 39%.',
    culture: 'American',
    category: 'seasons',
    relevantMonths: [2],
  },
  {
    id: 'season-006',
    title: 'Cherry Blossom Front',
    content: 'Japan\'s "sakura zensen" (cherry blossom front) moves northward through spring. Meteorologists track its progress, and "hanami" parties under the blossoms celebrate life\'s fleeting beauty.',
    culture: 'Japanese',
    category: 'seasons',
    relevantMonths: [3, 4],
  },
  {
    id: 'season-007',
    title: 'The Lengthening Light',
    content: 'After the winter solstice, days lengthen slowly at first—just seconds per day—then accelerate to several minutes daily by late February. By the equinox, day length increases fastest, gaining 3+ minutes daily.',
    culture: 'Modern',
    category: 'seasons',
    relevantMonths: [12, 1, 2, 3],
  },
  {
    id: 'season-008',
    title: 'Ice Saints and Frost Days',
    content: 'European farmers feared the "Ice Saints"—cold snaps around May 11-14 (Saints Mamertus, Pancras, and Servatius). Planting before these dates risked losing crops to late frost.',
    culture: 'European',
    category: 'seasons',
    relevantMonths: [5],
  },

  // More Star Lore
  {
    id: 'star-011',
    title: 'Antares: Heart of the Scorpion',
    content: 'Antares means "rival of Mars" (anti-Ares) because its red color matches the planet. This supergiant marks the heart of Scorpius and pulses in brightness over a 5-year cycle.',
    culture: 'Greek',
    category: 'stars',
    relevantMonths: [6, 7, 8],
  },
  {
    id: 'star-012',
    title: 'Aldebaran: The Follower',
    content: 'Aldebaran follows the Pleiades across the sky—its Arabic name means "the follower." This orange giant marks the eye of Taurus the Bull and helped ancient sailors navigate.',
    culture: 'Arabic',
    category: 'stars',
    relevantMonths: [11, 12, 1, 2],
  },
  {
    id: 'star-013',
    title: 'Castor and Pollux: The Heavenly Twins',
    content: 'Though appearing similar, Castor is actually six stars, while Pollux is a single orange giant with an exoplanet. In myth, Pollux shared his immortality with mortal Castor so they could remain together.',
    culture: 'Greek',
    category: 'stars',
    relevantMonths: [1, 2, 3, 4],
  },
  {
    id: 'star-014',
    title: 'Arcturus: Guardian of the Bear',
    content: 'Arcturus means "bear watcher," guarding Ursa Major. It\'s the brightest star in the northern hemisphere and was the first star (besides the sun) to be seen in daylight through a telescope, in 1635.',
    culture: 'Greek',
    category: 'stars',
    relevantMonths: [4, 5, 6, 7],
  },
  {
    id: 'star-015',
    title: 'Rigel: The Foot of the Giant',
    content: 'Rigel is Orion\'s foot and one of the most luminous stars visible—if placed at Sirius\'s distance, it would cast shadows. It\'s actually a system of at least four stars.',
    culture: 'Arabic',
    category: 'stars',
    relevantMonths: [12, 1, 2, 3],
  },

  // Cultural Astronomy
  {
    id: 'culture-001',
    title: 'Polynesian Wayfinding',
    content: 'Polynesian navigators crossed thousands of miles of open ocean using stars, waves, and bird behavior. They memorized "star compasses" linking stars to islands and could detect land from 30+ miles away.',
    culture: 'Polynesian',
    category: 'traditions',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'culture-002',
    title: 'Egyptian Decans',
    content: 'Egyptians divided the night into hours using 36 "decan" stars that rose sequentially. This system gave us the 24-hour day and influenced later Greek astronomy.',
    culture: 'Egyptian',
    category: 'traditions',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'culture-003',
    title: 'Navajo Star Ceiling',
    content: 'Traditional Navajo hogans were designed so the smoke hole faced east toward the morning star. The ceiling beams represented constellations, making each home a model of the cosmos.',
    culture: 'Navajo',
    category: 'traditions',
    relevantMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'culture-004',
    title: 'Inuit Moon Names',
    content: 'Inuit peoples name moons by survival activities: "Moon When Rivers Begin to Freeze," "Moon of Great Darkness," "Moon of Returning Light." These names tracked the harsh Arctic cycle.',
    culture: 'Inuit',
    category: 'moon',
    relevantMonths: [1, 2, 3, 10, 11, 12],
  },
  {
    id: 'culture-005',
    title: 'African Star Lore',
    content: 'Many African cultures used the Pleiades to time planting. The Xhosa called them "Isilimela" (digging stars) and planted when they appeared at dawn. The Zulu watched Canopus for harvest time.',
    culture: 'African',
    category: 'stars',
    relevantMonths: [10, 11, 12],
  },
];

// Upcoming astronomical events for 2024-2025
export const ASTRONOMICAL_EVENTS: AstronomicalEvent[] = [
  {
    name: 'Quadrantids Meteor Shower',
    date: new Date('2025-01-03'),
    description: 'One of the best annual meteor showers with up to 120 meteors per hour at peak.',
    type: 'meteor_shower'
  },
  {
    name: 'Wolf Moon (Full Moon)',
    date: new Date('2025-01-13'),
    description: 'The first full moon of the year, named after howling wolves in midwinter.',
    type: 'supermoon'
  },
  {
    name: 'Mercury at Greatest Eastern Elongation',
    date: new Date('2025-01-30'),
    description: 'Best time to view Mercury in the evening sky, highest above the horizon.',
    type: 'opposition'
  },
  {
    name: 'Snow Moon (Full Moon)',
    date: new Date('2025-02-12'),
    description: 'Named for the typically heavy snowfall of February.',
    type: 'supermoon'
  },
  {
    name: 'Venus at Greatest Eastern Elongation',
    date: new Date('2025-01-10'),
    description: 'Venus shines brilliantly as the "evening star" after sunset.',
    type: 'opposition'
  },
  {
    name: 'Worm Moon (Full Moon)',
    date: new Date('2025-03-14'),
    description: 'Spring is near! Named for earthworm casts that appear as the ground thaws.',
    type: 'supermoon'
  },
  {
    name: 'Spring Equinox',
    date: new Date('2025-03-20T09:01:00Z'),
    description: 'Day and night are nearly equal. The Sun crosses the celestial equator heading north.',
    type: 'equinox'
  },
  {
    name: 'Partial Lunar Eclipse',
    date: new Date('2025-03-14'),
    description: 'A partial eclipse visible from parts of North America, Europe, and Africa.',
    type: 'eclipse'
  },
  {
    name: 'Lyrid Meteor Shower',
    date: new Date('2025-04-22'),
    description: 'An average shower producing about 20 meteors per hour at peak.',
    type: 'meteor_shower'
  },
  {
    name: 'Eta Aquarids Meteor Shower',
    date: new Date('2025-05-06'),
    description: 'Produced by debris from Halley\'s Comet, with up to 60 meteors per hour.',
    type: 'meteor_shower'
  },
];

/**
 * Get sky lore appropriate for the current date
 */
export function getDailySkyLore(date: Date): SkyLore[] {
  const month = date.getMonth() + 1;
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

  // Filter to relevant months
  const relevant = SKY_LORE.filter(lore => lore.relevantMonths.includes(month));

  // Use day of year to consistently pick items (so same day = same content)
  const shuffled = [...relevant].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) * dayOfYear) % 100;
    const hashB = (b.id.charCodeAt(0) * dayOfYear) % 100;
    return hashA - hashB;
  });

  // Return top 2-3 items
  return shuffled.slice(0, 3);
}

/**
 * Get upcoming astronomical events
 */
export function getUpcomingEvents(date: Date, limit: number = 5): AstronomicalEvent[] {
  return ASTRONOMICAL_EVENTS
    .filter(event => event.date > date)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, limit);
}

/**
 * Get the next major event
 */
export function getNextMajorEvent(date: Date): AstronomicalEvent | null {
  const upcoming = getUpcomingEvents(date, 1);
  return upcoming.length > 0 ? upcoming[0] : null;
}

/**
 * Get events happening this week
 */
export function getThisWeeksEvents(date: Date): AstronomicalEvent[] {
  const weekStart = new Date(date);
  const weekEnd = new Date(date);
  weekEnd.setDate(weekEnd.getDate() + 7);

  return ASTRONOMICAL_EVENTS.filter(event =>
    event.date >= weekStart && event.date <= weekEnd
  );
}

/**
 * Get a random piece of sky lore
 */
export function getRandomSkyLore(): SkyLore {
  const index = Math.floor(Math.random() * SKY_LORE.length);
  return SKY_LORE[index];
}

/**
 * Get sky lore by category
 */
export function getSkyLoreByCategory(category: SkyLore['category']): SkyLore[] {
  return SKY_LORE.filter(lore => lore.category === category);
}
