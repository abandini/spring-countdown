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
