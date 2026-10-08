const db = require('../services/configDB');

const testDAO = {
  getAll: async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM test');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const [rows] = await db.query(
        'SELECT * FROM test WHERE id = ?',
        [req.params.id]
      );
      if (!rows[0]) return res.status(404).json({ error: 'No encontrado' });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name, birthdate } = req.body;
      if (!name || !birthdate) {
        return res.status(400).json({ error: 'Bad Request: Faltan datos' });
      }
      const [result] = await db.query(
        'INSERT INTO test (name, birthdate) VALUES (?, ?)',
        [name, birthdate]
      );
      res.status(201).json({ id: result.insertId, name, birthdate });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = testDAO;