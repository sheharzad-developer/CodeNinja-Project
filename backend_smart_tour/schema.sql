-- Schema + seed for the smart_tour database.
-- Run against the smart_tour database, e.g.:
--   psql -U postgres -d smart_tour -f schema.sql

CREATE TABLE IF NOT EXISTS users (
    user_id    SERIAL PRIMARY KEY,
    username   VARCHAR(255) NOT NULL,
    contact_no VARCHAR(50),
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS hotels (
    id                SERIAL PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    rating            NUMERIC(2,1),
    location          VARCHAR(255),
    hotel_description  TEXT,
    hotel_image       TEXT
);

CREATE TABLE IF NOT EXISTS rooms (
    id               SERIAL PRIMARY KEY,
    hotel_id         INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
    room_description  TEXT,
    price            NUMERIC(10,2),
    room_images      TEXT
);

CREATE TABLE IF NOT EXISTS packages (
    id            SERIAL PRIMARY KEY,
    package_name  VARCHAR(255) NOT NULL,
    package_image TEXT,
    price         NUMERIC(10,2),
    package_description TEXT
);

-- Seed sample tour packages (images bundled in frontend public/tours/)
INSERT INTO packages (package_name, package_image, price, package_description)
SELECT * FROM (VALUES
    ('Lahore Heritage Tour', '/tours/1.jpg', 15000, 'Explore the Walled City, Badshahi Mosque and Lahore Fort.'),
    ('Hunza Valley Adventure', '/tours/2.jpg', 45000, 'A week amid the peaks, glaciers and orchards of Hunza.'),
    ('Northern Lakes Escape', '/tours/3.jpg', 38000, 'Visit Saif-ul-Malook and the lakes of the north.'),
    ('Skardu Mountain Trek', '/tours/4.jpg', 52000, 'Trek the Karakoram trails and camp under the stars.')
) AS v(package_name, package_image, price, package_description)
WHERE NOT EXISTS (SELECT 1 FROM packages);

-- Seed sample hotels (idempotent: only seed when empty)
-- Images are bundled locally in frontend_smart_tour/public/hotels/ and served
-- from the frontend origin, so they render reliably offline.
INSERT INTO hotels (name, rating, location, hotel_description, hotel_image)
SELECT * FROM (VALUES
    ('Pearl Continental Lahore', 4.7, 'Lahore', 'Luxury 5-star hotel in the heart of Lahore with pool, spa and fine dining.', '/hotels/1.jpg'),
    ('Serena Hotel Islamabad', 4.8, 'Islamabad', 'Elegant resort-style hotel surrounded by the Margalla Hills.', '/hotels/2.jpg'),
    ('Movenpick Hotel Karachi', 4.5, 'Karachi', 'Modern beachside hotel near Clifton with rooftop dining.', '/hotels/3.jpg'),
    ('Hunza Embassy Hotel', 4.3, 'Hunza', 'Scenic mountain-view rooms overlooking the Karakoram range.', '/hotels/4.jpg'),
    ('Swat Continental Hotel', 4.2, 'Swat', 'Comfortable valley retreat near the Swat River.', '/hotels/5.jpg')
) AS v(name, rating, location, hotel_description, hotel_image)
WHERE NOT EXISTS (SELECT 1 FROM hotels);

-- One room per seeded hotel (price shown in the listing)
INSERT INTO rooms (hotel_id, room_description, price, room_images)
SELECT h.id, 'Deluxe Room - king bed, breakfast included', p.price, h.hotel_image
FROM hotels h
JOIN (VALUES
    ('Pearl Continental Lahore', 22000),
    ('Serena Hotel Islamabad', 28000),
    ('Movenpick Hotel Karachi', 19500),
    ('Hunza Embassy Hotel', 12000),
    ('Swat Continental Hotel', 10500)
) AS p(name, price) ON p.name = h.name
WHERE NOT EXISTS (SELECT 1 FROM rooms);
