-- Create devices table
CREATE TABLE devices (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('light', 'thermostat', 'lock', 'speaker')),
  room TEXT NOT NULL,
  is_online BOOLEAN NOT NULL DEFAULT true,
  value DOUBLE PRECISION DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create energy_data table
CREATE TABLE energy_data (
  id BIGSERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_usage DOUBLE PRECISION NOT NULL,
  daily_total DOUBLE PRECISION NOT NULL,
  savings DOUBLE PRECISION NOT NULL DEFAULT 0
);

-- Create recent_activities table
CREATE TABLE recent_activities (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  location TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert sample devices
INSERT INTO devices (id, name, type, room, is_online, value) VALUES
  ('living-room-lights', 'Living Room Lights', 'light', 'Living Room', true, 75),
  ('bedroom-lights', 'Bedroom Lights', 'light', 'Bedroom', true, 50),
  ('kitchen-lights', 'Kitchen Lights', 'light', 'Kitchen', false, 0),
  ('main-thermostat', 'Main Thermostat', 'thermostat', 'Living Room', true, 72),
  ('bedroom-thermostat', 'Bedroom Thermostat', 'thermostat', 'Bedroom', true, 68),
  ('front-door-lock', 'Front Door', 'lock', 'Entrance', true, 1),
  ('back-door-lock', 'Back Door', 'lock', 'Kitchen', true, 1),
  ('living-room-speaker', 'Living Room Speaker', 'speaker', 'Living Room', true, 60),
  ('bedroom-speaker', 'Bedroom Speaker', 'speaker', 'Bedroom', false, 0);

-- Insert sample energy data
INSERT INTO energy_data (current_usage, daily_total, savings) VALUES
  (2.4, 45.8, 8.2);

-- Insert sample activities
INSERT INTO recent_activities (type, message, location) VALUES
  ('device', 'Living Room Lights turned on', 'Living Room'),
  ('security', 'Front door unlocked', 'Entrance'),
  ('energy', 'Energy saving mode activated', 'System'),
  ('device', 'Thermostat adjusted to 72°F', 'Living Room'),
  ('security', 'All doors locked for night', 'System');
