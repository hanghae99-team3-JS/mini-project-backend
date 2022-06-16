const usersRouter = require('../routes/users.route');
const commentsRouter = require('../routes/comments');
const postsRouter = require('../routes/posts');
const testRouter = require('../routes/test');

module.exports = [usersRouter, commentsRouter, postsRouter, testRouter];
