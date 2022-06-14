const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    expires: 600,
    default: Date.now,
  },
});

module.exports = mongoose.model('token', Schema);
