const bcrypt = require('bcrypt');
const userService = require('../services/users.service');
const Tokens = require('../schemas/token');
const validateUser = require('../functions/validate_user');
const token = require('../functions/issue_token');
const throwError = require('../functions/throw_error');

require('dotenv').config();

async function getMyInfo(req, res) {
  // #swagger.tags = ['Users']
  const { email } = res.locals.user;
  const user = await userService.findMyInfo(email);
  const { nickname, profileImg } = user;

  res.send({ success: true, email, nickname, profileImg });
}

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

  res
    .cookie('accessToken', accessToken)
    .cookie('refreshToken', refreshToken)
    .json({ success: true, email, nickname });
}

async function postSignup(req, res) {
  // #swagger.tags = ['Users']
  let { email, nickname, password, confirmPassword } = req.body;
  let { profileImg } = req.cookies;
  const schema = validateUser(nickname);

  await schema.validateAsync({ email, nickname, password, confirmPassword });

  const user = await userService.findSameInfo(email, nickname);

  if (user) {
    throwError('중복된 유저 정보가 존재합니다.', 409);
  }

  password = bcrypt.hashSync(password, 10);
  profileImg = process.env.S3_URL + profileImg;

  await userService.createUser(email, nickname, password, profileImg);

  return res.json({ success: true, message: '회원 가입이 완료되었습니다.' });
}

async function getProfileImg(req, res) {
  res.render('image.html');
}

async function postProfileImg(req, res) {
  const profileImg = req.file.key;

  res
    .cookie('profileImg', profileImg, {
      maxAge: 600000,
    })
    .json({ success: true });
}

module.exports = {
  getMyInfo,
  postLogin,
  postSignup,
  getProfileImg,
  postProfileImg,
};
