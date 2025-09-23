const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String },
  location: { type: String },
  description: { type: String },
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);