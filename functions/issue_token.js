const jwt = require('jsonwebtoken');

function issueAccessToken(userId) {
  return (
    'Bearer ' +
    jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: '30m',
    })
  );
}

function issueRefreshToken(userId) {
  return (
    'Bearer ' +
    jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: '3h',
    })
  );
}

module.exports = { issueAccessToken, issueRefreshToken };
