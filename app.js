const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const errorMiddleware = require('./middlewares/error');
const routers = require('./middlewares/router');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const connect = require('./schemas');

const port = 5000;

const app = express();

connect();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api', routers);

app.use(function (req, res, next) {
  res.status(404).send('요청하신 페이지를 찾을 수 없습니다.');
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log('🟢', port, '번 포트');
});
