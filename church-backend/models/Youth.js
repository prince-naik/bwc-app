const mongoose = require('mongoose');

const youthSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  mentor: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Youth', youthSchema);