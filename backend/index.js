require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const dbPath = path.join(__dirname, 'cafe.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Orders Table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT,
      phone_number TEXT,
      location TEXT,
      items_ordered TEXT,
      quantity INTEGER,
      total_price REAL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'pending'
    )`);
  }
});

// GET all orders
app.get('/api/orders', (req, res) => {
  const sql = 'SELECT * FROM orders ORDER BY timestamp DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST a new order
app.post('/api/orders', (req, res) => {
  const { customer_name, phone_number, location, items_ordered, quantity, total_price } = req.body;
  const sql = `INSERT INTO orders (customer_name, phone_number, location, items_ordered, quantity, total_price) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [customer_name, phone_number, location, items_ordered, quantity, total_price], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      message: 'Order created successfully'
    });
  });
});

// PUT update order status
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = `UPDATE orders SET status = ? WHERE id = ?`;
  
  db.run(sql, [status, id], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Order updated successfully', changes: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
