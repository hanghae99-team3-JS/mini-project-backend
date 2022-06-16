const bcrypt = require('bcrypt');
const userService = require('../services/users.service');
const Tokens = require('../schemas/token');
const validateUser = require('../functions/validate_user');
const token = require('../functions/issue_token');
const throwError = require('../functions/throw_error');
const logger = require('../functions/winston');

require('dotenv').config();

// 프로필 조회
async function getMyInfo(req, res) {
  // #swagger.tags = ['Users']
  const { email } = res.locals.user;
  const user = await userService.findMyInfo(email);

  if (!user) {
    throwError(401, '회원 정보를 찾을 수 없습니다.');
  }

  const { nickname, profileImg } = user;

  logger.info(`${nickname} - 프로필 확인`);

  res.send({ success: true, email, nickname, profileImg });
}

// 프로필 사진 등록
async function postProfileImg(req, res) {
  // #swagger.tags = ['Users']
  const { nickname } = req.params;
  const profileImg = req.file.key;

  await userService.updateProfileImg(nickname, profileImg);

  logger.info(`${nickname} - 프로필 업데이트`);

  res.json({ success: true, profileImg: process.env.S3_URL + profileImg });
}

// 로그인
async function postLogin(req, res) {
  // #swagger.tags = ['Users']
  const { email, password } = req.body;
  const user = await userService.findUserInfo(email);
  const result = await bcrypt.compare(password, user?.password || '');

  if (!user || !result) {
    throwError('이메일 또는 패스워드를 확인해주세요.', 401);
  }

  const { userId, nickname } = user;
  const accessToken = token.issueAccessToken(userId);
  const refreshToken = token.issueRefreshToken(userId);

  await Tokens.deleteOne({ userId });
  await Tokens.create({ userId, refreshToken });

  logger.info(`${nickname} - 로그인`);

  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
    })
    .json({ success: true, email, nickname });
}

// 로그아웃
async function postLogout(req, res) {
  // #swagger.tags = ['Users']
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json({ success: true, message: '로그아웃 완료' });
}

// 회원가입
async function postSignup(req, res) {
  // #swagger.tags = ['Users']
  let { email, nickname, password, confirmPassword } = req.body;
  const schema = validateUser(nickname);

  await schema.validateAsync({ email, nickname, password, confirmPassword });

  const user = await userService.findSameInfo(email, nickname);

  if (user) {
    throwError('중복된 유저 정보가 존재합니다.', 409);
  }

  password = bcrypt.hashSync(password, 10);

  await userService.createUser(email, nickname, password);

  logger.info(`${nickname} - 회원가입`);

  return res.json({ success: true, message: '회원 가입이 완료되었습니다.' });
}

module.exports = {
  getMyInfo,
  postProfileImg,
  postLogin,
  postLogout,
  postSignup,
};
