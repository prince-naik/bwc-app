const mongoose = require('mongoose');

const sermonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speaker: { type: String },
  date: { type: Date, required: true },
  notes: { type: String },
  videoLink: { type: String },
  tags: [String],
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sermon', sermonSchema);