const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const authMiddleware = require('../middleware/authMiddleware');

// Create announcement (Pastor/Admin only)
router.post('/', authMiddleware, async (req, res) => {
  const { title, message, urgency } = req.body;
  const role = req.user.role;
  if (role !== 'Pastor' && role !== 'Admin') {
    return res.status(403).json({ error: 'Only pastors and admins can post announcements' });
  }

  try {
    const announcement = new Announcement({
      title,
      message,
      urgency,
      createdBy: req.user.id
    });
    await announcement.save();
    res.json(announcement);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create announcement' });
  }
});

// Get all announcements (any role)
router.get('/', authMiddleware, async (req, res) => {
  const announcements = await Announcement.find().sort({ createdAt: -1 });
  res.json(announcements);
});

// Delete announcement (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Only admins can delete announcements' });
  }

  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete announcement' });
  }
});

module.exports = router;