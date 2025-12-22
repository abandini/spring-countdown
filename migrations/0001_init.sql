-- Spring Countdown Database Schema
-- Initial migration

-- User preferences and location data
CREATE TABLE IF NOT EXISTS user_preferences (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    location_lat REAL,
    location_lon REAL,
    location_name TEXT,
    timezone TEXT DEFAULT 'America/New_York',
    theme TEXT DEFAULT 'auto' CHECK (theme IN ('light', 'dark', 'auto')),
    notifications_enabled INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Daily streaks for engagement
CREATE TABLE IF NOT EXISTS visit_streaks (
    user_id TEXT PRIMARY KEY,
    current_streak INTEGER DEFAULT 1,
    longest_streak INTEGER DEFAULT 1,
    last_visit_date TEXT,
    total_visits INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Anonymous view counter
CREATE TABLE IF NOT EXISTS site_stats (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    total_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initialize site stats
INSERT OR IGNORE INTO site_stats (id, total_views, unique_visitors)
VALUES (1, 0, 0);

-- Fun facts storage
CREATE TABLE IF NOT EXISTS fun_facts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL CHECK (category IN ('spring', 'equinox', 'daylight', 'solstice', 'nature')),
    fact TEXT NOT NULL,
    source TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial fun facts
INSERT INTO fun_facts (category, fact) VALUES
    ('equinox', 'On the spring equinox, day and night are nearly equal in length everywhere on Earth.'),
    ('daylight', 'After the winter solstice, we gain about 2-3 minutes of daylight each day in mid-latitudes.'),
    ('spring', 'The word "equinox" comes from Latin words meaning "equal night."'),
    ('nature', 'Cherry blossoms in Japan typically bloom within 2 weeks of the spring equinox.'),
    ('solstice', 'The winter solstice has been celebrated by cultures worldwide for thousands of years.'),
    ('daylight', 'By the spring equinox, we''ll have gained about 3 hours of daylight since winter solstice!'),
    ('spring', 'Spring fever is real - increased sunlight triggers serotonin production in our brains.'),
    ('nature', 'Birds start singing earlier in the morning as days get longer - it''s called the "dawn chorus."'),
    ('equinox', 'The spring equinox marks the start of the astronomical spring in the Northern Hemisphere.'),
    ('daylight', 'At 40° latitude, the longest day of summer has about 6 more hours of daylight than the shortest winter day.');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_prefs_location ON user_preferences(location_lat, location_lon);
CREATE INDEX IF NOT EXISTS idx_fun_facts_category ON fun_facts(category, active);
