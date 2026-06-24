const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Heartbeat route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BrokeSim Backend is running' });
});

// Save a new game session
app.post('/api/sessions', (req, res) => {
  const { username, persona, starting_cash, ending_cash, net_worth, financial_score, decisions, status } = req.body;

  if (!username || !persona || starting_cash === undefined || ending_cash === undefined || net_worth === undefined || financial_score === undefined) {
    return res.status(400).json({ error: 'Missing required game session fields' });
  }

  // Insert/Ensure user exists
  db.run('INSERT OR IGNORE INTO users (username) VALUES (?)', [username], function(err) {
    if (err) {
      console.error('Error inserting user:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    // Insert game session
    const decisionsStr = typeof decisions === 'string' ? decisions : JSON.stringify(decisions || []);
    const query = `
      INSERT INTO game_sessions (username, persona, starting_cash, ending_cash, net_worth, financial_score, decisions, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [username, persona, starting_cash, ending_cash, net_worth, financial_score, decisionsStr, status];

    db.run(query, params, function(err2) {
      if (err2) {
        console.error('Error saving session:', err2.message);
        return res.status(500).json({ error: 'Failed to save session' });
      }
      res.status(201).json({ message: 'Session saved successfully', sessionId: this.lastID });
    });
  });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  const { persona } = req.query;
  let query = `
    SELECT id, username, persona, net_worth, financial_score, status, timestamp
    FROM game_sessions
  `;
  const params = [];

  if (persona) {
    query += ` WHERE persona = ?`;
    params.push(persona);
  }

  query += ` ORDER BY financial_score DESC, net_worth DESC LIMIT 15`;

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching leaderboard:', err.message);
      return res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
    res.json(rows);
  });
});

// Get aggregate stats
app.get('/api/stats', (req, res) => {
  const query = `
    SELECT 
      persona,
      COUNT(*) as total_plays,
      AVG(financial_score) as avg_score,
      SUM(CASE WHEN status = 'Broke' THEN 1 ELSE 0 END) as broke_count,
      SUM(CASE WHEN status = 'Survived' THEN 1 ELSE 0 END) as survived_count,
      SUM(CASE WHEN status = 'Thrived' THEN 1 ELSE 0 END) as thrived_count
    FROM game_sessions
    GROUP BY persona
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching stats:', err.message);
      return res.status(500).json({ error: 'Failed to fetch statistics' });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
