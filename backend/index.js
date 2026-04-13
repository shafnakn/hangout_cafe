require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize PostgreSQL Database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Create Orders Table on startup
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name TEXT,
        phone_number TEXT,
        location TEXT,
        items_ordered TEXT,
        quantity INTEGER,
        total_price REAL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'pending'
      )
    `);
    console.log('Connected to PostgreSQL database.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

initDB();

// GET all orders
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer_name, phone_number, location, items_ordered, quantity, total_price } = req.body;
    const result = await pool.query(
      `INSERT INTO orders (customer_name, phone_number, location, items_ordered, quantity, total_price) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [customer_name, phone_number, location, items_ordered, quantity, total_price]
    );
    res.status(201).json({
      id: result.rows[0].id,
      message: 'Order created successfully'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update order status
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2',
      [status, id]
    );
    res.json({ message: 'Order updated successfully', changes: result.rowCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
