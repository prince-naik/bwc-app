const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.get('/dashboard', authMiddleware, requireRole('Volunteer'), (req, res) => {
  res.json({ message: 'Welcome Volunteer' });
});

module.exports = router;