const Users = require('../schemas/user');

async function findMyInfo(email) {
  return await Users.findOne({ email }).exec();
}

async function updateProfileImg(nickname, profileImg) {
  await Users.updateOne({ nickname }, { profileImg });
}

async function findUserInfo(email, password) {
  return await Users.findOne({ email, password }).exec();
}

async function findSameInfo(email, nickname) {
  return await Users.findOne({
    $or: [{ email: email }, { nickname: nickname }],
  }).exec();
}

async function createUser(email, nickname, password) {
  await Users.create({ email, nickname, password });
}

module.exports = {
  findMyInfo,
  updateProfileImg,
  findUserInfo,
  findSameInfo,
  createUser,
};
