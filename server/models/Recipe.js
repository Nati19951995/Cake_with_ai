const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create a new recipe
router.post('/generate', async (req, res) => {
  const { cakeType, ingredients, instructions, imageUrl } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO recipes (cake_type, ingredients, instructions, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [cakeType, ingredients, instructions, imageUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
