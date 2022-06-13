const jwt = require('jsonwebtoken');
const throwError = require('../functions/throw_error');

require('dotenv').config();

function verifyToken(token, callback = null) {
  const [tokenType, tokenValue] = token.split(' ');

  if (tokenType !== 'Bearer') {
    throwError('토큰 인증 타입이 적절하지 않습니다.', 401);
  }

  return jwt.verify(tokenValue, process.env.JWT_SECRET_KEY, callback);
}

module.exports = { verifyToken };
