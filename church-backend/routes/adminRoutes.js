const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.get('/dashboard', authMiddleware, requireRole('Admin'), (req, res) => {
  res.json({ message: 'Welcome Admin, you have full access.' });
});

module.exports = router;