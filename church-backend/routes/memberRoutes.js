const express = require('express');
const router = express.Router();
const { getMembers, addMember, deleteMember } = require('../controllers/memberController');
const Member = require('../models/Member'); // ✅ Import the Member model
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');




router.get('/', getMembers);
router.post('/', addMember);
router.delete('/:id', deleteMember);


router.put('/:id', async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Member not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating member:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/count', async (req, res) => {
  try {
    const count = await Member.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error counting members:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/dashboard', authMiddleware, requireRole('Member'), (req, res) => {
  res.json({ message: 'Welcome Member.' });
});


module.exports = router;