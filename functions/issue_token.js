const jwt = require('jsonwebtoken');

function issueAccessToken(userId) {
  return (
    'Bearer ' +
    jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: '20s',
    })
  );
}

function issueRefreshToken(userId) {
  return (
    'Bearer ' +
    jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: '10m',
    })
  );
}

module.exports = { issueAccessToken, issueRefreshToken };
