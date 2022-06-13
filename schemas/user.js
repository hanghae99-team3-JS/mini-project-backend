const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
});

Schema.virtual('userId').get(function () {
  return this._id.toHexString();
});

Schema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('user', Schema);
