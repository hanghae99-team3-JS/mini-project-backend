const usersRouter = require('../routes/users.route');
const commentsRouter = require('../routes/comments');
const postsRouter = require('../routes/posts');

module.exports = [usersRouter, commentsRouter, postsRouter];
