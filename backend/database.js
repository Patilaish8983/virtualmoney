const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'brokesim.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database at', dbPath);
    initializeTables();
  }
});

function initializeTables() {
  db.serialize(() => {
    // Create users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create game_sessions table
    db.run(`
      CREATE TABLE IF NOT EXISTS game_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        persona TEXT NOT NULL,
        starting_cash REAL NOT NULL,
        ending_cash REAL NOT NULL,
        net_worth REAL NOT NULL,
        financial_score INTEGER NOT NULL,
        decisions TEXT NOT NULL, -- JSON string
        status TEXT NOT NULL, -- 'Broke', 'Survived', 'Thrived'
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database tables initialized successfully.');
  });
}

module.exports = db;
