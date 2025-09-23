const Member = require('../models/Member');

exports.getMembers = async (req, res) => {
  const members = await Member.find();
  res.json(members);
};

exports.addMember = async (req, res) => {
  const newMember = new Member(req.body);
  await newMember.save();
  res.status(201).json(newMember);
};

exports.deleteMember = async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ message: 'Member deleted' });
};