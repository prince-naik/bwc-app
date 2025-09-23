const express = require('express');
const router = express.Router();
const { getSermons, addSermon, deleteSermon } = require('../controllers/sermonController');
const Sermon = require('../models/Sermon'); // ✅ Import the Sermon model

router.get('/', getSermons);
router.post('/', addSermon);
router.delete('/:id', deleteSermon);

router.get('/count', async (req, res) => {
  try {
    const count = await Sermon.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error counting sermons:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Sermon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Sermon not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating sermon:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;