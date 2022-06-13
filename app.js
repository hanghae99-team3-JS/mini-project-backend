const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connect = require('./schemas');
const app = express();
const port = 5000;
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

connect();

const usersRouter = require('./routes/users.route');
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');

const requestMiddleware = (req, res, next) => {
  console.log('request URL:', req.originalUrl, '-', new Date());
  next();
};

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestMiddleware);

app.use('/api', [usersRouter, postsRouter, commentsRouter]);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//404 error
app.use(function (req, res, next) {
  res.status(404).send('요청하신 페이지를 찾을 수 없습니다.');
});

//에러 처리
app.use((err, req, res, next) => {
  res.status(err.status || 400).json({ success: false, message: err.message });
});

app.listen(port, () => {
  console.log('🟢', port, '번 포트');
});
