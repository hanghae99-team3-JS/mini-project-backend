const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postsSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
});

//mongoose-sequence
postsSchema.plugin(AutoIncrement, { start_seq: 1, inc_field: 'postId' });

module.exports = mongoose.model('Posts', postsSchema);
