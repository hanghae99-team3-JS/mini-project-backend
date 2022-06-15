const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postsController = require('../controllers/postsController');
const wrap = require('../controllers/wrapAsyncController').wrapAsyncController;
require('express-async-errors');

//게시글 작성
// router.post('/posts', auth, wrap(postsController.addPosts));
router.post('/posts', postsController.addPosts);

//게시글 전체 조회
router.get('/posts', postsController.loockupAllPosts);

//게시글 상세 조회
router.get('/posts/:postId', postsController.loockupDetailPost);

//게시글 수정
router.put('/posts/:postId', postsController.editPost);

//게시글 삭제
router.delete('/posts/:postId', postsController.deletePost);

module.exports = router;
