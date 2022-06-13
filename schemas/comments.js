const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentSchema = mongoose.Schema({
  postId: {
    type: Number,
    required: true,
  },
  commentId: {
    type: Number,
    unique: true,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  date: {
    format: Date(),
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Comments', commentSchema);
