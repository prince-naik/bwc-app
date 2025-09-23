const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Pastor', 'Volunteer', 'Member'], default: 'Member' },
  email: String,
  phone: String,
  birthday: Date,
  joinedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);