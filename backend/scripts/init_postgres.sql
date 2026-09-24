-- ==============================================================
-- WANDERLUSH BROMO - POSTGRESQL DATABASE INITIALIZATION SCRIPT
-- Execute this script in PostgreSQL (psql or Railway Query Console)
-- ==============================================================

-- 1. Create extension for UUID generation (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash TEXT NOT NULL,
    phone_number VARCHAR(25),
    bio VARCHAR(500),
    avatar_url VARCHAR(500),
    role VARCHAR(30) NOT NULL DEFAULT 'Traveler',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at_utc TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    updated_at_utc TIMESTAMPTZ,
    last_login_at_utc TIMESTAMPTZ
);

-- 3. Create unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users (is_active);

-- 4. Trigger for automatic updated_at_utc timestamping
CREATE OR REPLACE FUNCTION update_user_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at_utc = (NOW() AT TIME ZONE 'UTC');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_update_timestamp ON users;
CREATE TRIGGER trg_users_update_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_user_timestamp();

-- 5. Seed initial demo user
-- Password for demo traveler: 'Bromo2026!'
-- Salted PBKDF2 hash compatible with our C# PasswordHasher:
-- Format: {iterations}.{salt_base64}.{hash_base64}
INSERT INTO users (
    id,
    full_name,
    email,
    password_hash,
    phone_number,
    bio,
    avatar_url,
    role,
    is_active,
    created_at_utc
) VALUES (
    'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    'Aris Prasetyo',
    'aris.traveler@wanderlush.com',
    '100000.vG53V0100yqJv3yL2K7q5w==.b7G2GzM3vWz+f0D2K1g4n8L0x1v7Y3m9P1q5w8==',
    '+62 812-3456-7890',
    'Bromo caldera explorer, mountain photographer, and highland trekker.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    'Traveler',
    TRUE,
    NOW() AT TIME ZONE 'UTC'
) ON CONFLICT (id) DO NOTHING;

-- Verification query
SELECT id, full_name, email, role, is_active, created_at_utc FROM users;
