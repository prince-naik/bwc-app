const express = require('express');
const router = express.Router();
const { getEvents, addEvent, deleteEvent } = require('../controllers/eventController');
const Event = require('../models/Event'); // ✅ Import the Event model

router.get('/', getEvents);
router.post('/', addEvent);
router.delete('/:id', deleteEvent);

router.get('/count', async (req, res) => {
  try {
    const count = await Event.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error counting events:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Event not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;