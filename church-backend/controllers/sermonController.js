const Sermon = require('../models/Sermon');

exports.getSermons = async (req, res) => {
  const sermons = await Sermon.find().sort({ date: -1 });
  res.json(sermons);
};

exports.addSermon = async (req, res) => {
  const newSermon = new Sermon(req.body);
  await newSermon.save();
  res.status(201).json(newSermon);
};

exports.deleteSermon = async (req, res) => {
  await Sermon.findByIdAndDelete(req.params.id);
  res.json({ message: 'Sermon deleted' });
};