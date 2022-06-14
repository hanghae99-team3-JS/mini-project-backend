const Users = require('../schemas/user');
const Tokens = require('../schemas/token');
const { verifyToken } = require('../functions/verify_token');
const { issueAccessToken } = require('../functions/issue_token');
const throwError = require('../functions/throw_error');

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies) {
      throwError('토큰이 존재하지 않습니다.', 401);
    }

    const { accessToken, refreshToken } = req.cookies;

    const { userId } = await verifyToken(
      accessToken,
      async function (err, decoded) {
        if (err) {
          const token = await Tokens.findOne({ refreshToken });

          if (token) {
            const { userId } = verifyToken(refreshToken);
            const newAccessToken = issueAccessToken(userId);

            console.log('엑세스 토큰 재발급');
            res.cookie('accessToken', newAccessToken);

            return { userId };
          }
          throwError('유효하지 않은 토큰입니다.', 401);
        }
        return decoded;
      }
    );

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
