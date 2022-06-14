const Posts = require('../schemas/posts');

//export

//게시글 작성
exports.addPosts = async (category, nickname, title, content) => {
  try {
    await Posts.create({
      category,
      nickname,
      title,
      content,
    });
  } catch (error) {
    throw { error, serviceError: '게시글 작성 DB 오류🔴' };
  }
};

//게시글 전체 조회
exports.loockupAllPosts = async () => {
  try {
    return await Posts.find(
      {},
      { _id: 0, postId: 1, nickname: 1, title: 1, date: 1 }
    ).sort({ date: -1 });
  } catch (error) {
    throw { error, serviceError: '게시글 전체 조회 DB 오류🔴' };
  }
};

//게시글 상세 조회
exports.loockupDetailPost = async (postId) => {
  try {
    return await Posts.find({ postId: Number(postId) }, { _id: 0 });
  } catch (error) {
    throw { error, serviceError: '게시글 상세 조회 실패(DB)🔴' };
  }
};

//게시글 수정
exports.editPost = async (nickname, postId, title, content) => {
  try {
    const checkNickname = await Posts.findOne({ postId: Number(postId) });
    if (checkNickname['nickname'] !== nickname) {
      res.status(400).send({
        errorMessage: '본인이 작성한 게시글이 아닙니다.',
      });
      return;
    }

    await Posts.updateOne(
      { postId: Number(postId) },
      { $set: { title, content } }
    );
  } catch (error) {
    throw { error, serviceError: '게시글 수정 실패(DB)🔴' };
  }
};

//게시글 삭제
exports.deletePost = async (nickname, postId) => {
  try {
    const checkNickname = await Posts.findOne({ postId: Number(postId) });
    if (checkNickname['nickname'] !== nickname) {
      res.status(400).send({
        errorMessage: '본인이 작성한 게시글이 아닙니다.',
      });
      return;
    }

    await Posts.deleteOne({ postId: Number(postId) });
  } catch (error) {
    throw { error, serviceError: '게시글 삭제 실패(DB)🔴' };
  }
};
