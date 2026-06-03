import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

/** SQLite storage — not used for email-only bookings; does not persist on Vercel serverless. */

const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'bookings.db');

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_reference TEXT UNIQUE NOT NULL,
    tour_id TEXT NOT NULL,
    tour_name TEXT NOT NULL,
    tour_date TEXT NOT NULL,
    tour_time TEXT NOT NULL,
    participants INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    special_requests TEXT,
    transportation_type TEXT,
    base_price REAL NOT NULL,
    transportation_price REAL DEFAULT 0,
    total_price REAL NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    paypal_order_id TEXT,
    paypal_capture_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_booking_reference ON bookings(booking_reference);
  CREATE INDEX IF NOT EXISTS idx_customer_email ON bookings(customer_email);
  CREATE INDEX IF NOT EXISTS idx_tour_date ON bookings(tour_date);
  CREATE INDEX IF NOT EXISTS idx_payment_status ON bookings(payment_status);
`);

export default db;

