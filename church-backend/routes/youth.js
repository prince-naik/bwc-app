const express = require('express');
const router = express.Router();
const Youth = require('../models/Youth');

// POST /api/youth
router.post('/', async (req, res) => {
  try {
    const youth = new Youth(req.body);
    await youth.save();
    res.status(201).json(youth);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add youth' });
  }
});

// GET /api/youth
router.get('/', async (req, res) => {
  try {
    const youthList = await Youth.find();
    res.json(youthList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch youth' });
  }
});

// DELETE /api/youth/:id
router.delete('/:id', async (req, res) => {
  try {
    await Youth.findByIdAndDelete(req.params.id);
    res.json({ message: 'Youth deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete youth' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Youth.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update youth' });
  }
});

module.exports = router;