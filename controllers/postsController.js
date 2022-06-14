const postsService = require('../services/postsService');

//module.exposts

//게시글 작성
// async function addPosts(req, res, next) {
//   try {
//     const { nickname } = res.locals.user;
//     const { title, content } = req.body;
//     const { category } = req.query;

//     await postsService.addPosts(category, nickname, title, content);
//     res.json({ success: true });
//   } catch (error) {
//     next({
//       message: error.serviceError || '게시글 작성 실패🔴',
//       error,
//       status: 500,
//     });
//   }
// }

//게시글 작성(wrap)
async function addPosts(req, res) {
  // #swagger.tags = ['Posts']
  const { category, nickname, title, content } = req.body;

  if (title === '' || content === '') {
    let error = new Error('🔴 제목 또는 내용을 입력해주세요');
    error.status = 400;
    throw error;
  }

  await postsService.addPosts(category, nickname, title, content);
  res.json({ success: true });
}

//게시글 전체 조회
// async function loockupAllPosts(req, res, next) {
//   try {
//     const { category } = req.query;

//     const posts = await postsService.loockupAllPosts(category);

//     res.json({
//       posts,
//     });
//   } catch (error) {
//     next({
//       message: error.serviceError || '게시글 전체 조회 실패🔴',
//       error,
//       status: 500,
//     });
//   }
// }

//게시글 전체 조회 (express-async-errors)
async function loockupAllPosts(req, res, next) {
  // #swagger.tags = ['Posts']
  const { category } = req.body;

  const posts = await postsService.loockupAllPosts(category);

  if (!posts.length) {
    let error = new Error('🔴 올바른 카테고리가 아닙니다');
    error.status = 404;
    throw error;
  }

  res.json({
    posts,
  });
}

//게시글 상세 조회
async function loockupDetailPost(req, res, next) {
  // #swagger.tags = ['Posts']
  try {
    const { postId } = req.params;

    const post = await postsService.loockupDetailPost(postId);

    res.json({
      post,
    });
  } catch (error) {
    next({
      message: error.serviceError || '게시글 상세 조회 실패🔴',
      error,
      status: 500,
    });
  }
}

//게시글 수정
async function editPost(req, res, next) {
  // #swagger.tags = ['Posts']
  try {
    const { postId } = req.params;
    const { nickname, title, content } = req.body;

    await postsService.editPost(nickname, postId, title, content);

    res.json({ success: true });
  } catch (error) {
    next({
      message: error.serviceError || '게시글 수정 실패🔴',
      error,
      status: 500,
    });
  }
}

//게시글 삭제
async function deletePost(req, res, next) {
  // #swagger.tags = ['Posts']
  try {
    const { nickname } = res.body;
    const { postId } = req.params;

    await postsService.deletePost(nickname, postId);

    res.json({ success: true });
  } catch (error) {
    next({
      message: error.serviceError || '게시글 삭제 실패🔴',
      error,
      status: 500,
    });
  }
}
module.exports = {
  addPosts,
  loockupAllPosts,
  loockupDetailPost,
  editPost,
  deletePost,
};
