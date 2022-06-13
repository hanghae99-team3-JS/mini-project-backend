const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.0nu1p.mongodb.net/?retryWrites=true&w=majority`;

const connect = () => {
  mongoose
    .connect(uri, { ignoreUndefined: true })
    .then(() => console.log('DB 연결 성공'))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
