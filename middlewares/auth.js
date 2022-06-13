const Users = require('../schemas/user');
const { verifyToken } = require('../functions/verify_token');
const { issueAccessToken } = require('../functions/issue_token');
const throwError = require('../functions/throw_error');

module.exports = (req, res, next) => {
  try {
    if (!req.cookies) {
      throwError('토큰이 존재하지 않습니다.', 401);
    }

    const { accessToken, refreshToken } = req.cookies;

    const { userId } = verifyToken(accessToken, function (err, decoded) {
      if (err) {
        const { userId } = verifyToken(refreshToken);
        const accessToken = issueAccessToken(userId);

        console.log('엑세스 토큰 재발급');
        res.cookie('accessToken', accessToken);

        return { userId };
      }
      return decoded;
    });

    Users.findById(userId)
      .exec()
      .then((user) => {
        res.locals.user = user;
        console.log('유저 인증 성공');
        next();
      });
  } catch (error) {
    console.log(error);
    throwError('유저 인증에 실패하였습니다.', 401);
  }
};
