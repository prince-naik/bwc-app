const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.get('/dashboard', authMiddleware, requireRole('Pastor'), (req, res) => {
  res.json({ message: 'Welcome Pastor, manage sermons and announcements.' });
});

module.exports = router;