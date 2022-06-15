const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
  nickname: {
    type: String,
    ref: 'User',
  },
  commentId: {
    type: String,
    ref: 'Comments',
  },
});

likeSchema.index({ commentId: 1, nickname: 1 });

const Like = mongoose.model('Likes', likeSchema);
module.exports = Like;
