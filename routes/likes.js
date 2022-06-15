const express = require('express');
const router = express.Router();
const Like = require('../schemas/likes');

//좋아요 수 전체 보기
router.get('/comment/likes', async (req, res) => {
  const { commentId } = req.params;
  const likes = await Like.aggregate([
    { $group: { _id: '$commentId', count: { $sum: 1 } } },
  ]);
  const likesCount = likes.length;
  console.log(likesCount);
  res.json({
    likes,
  });
});

//좋아요 수 조회 기능
router.get('/comment/:commentId/likes', async (req, res) => {
  const { commentId } = req.params;
  const likes = await Like.find({ commentId });
  const likesCount = likes.length;
  console.log(likesCount);
  res.json({
    likesCount,
  });
});

//좋아요, 좋아요 취소 기능
router.post('/likes', async (req, res) => {
  const { nickname, commentId } = req.body;

  const like = await Like.findOne({ nickname, commentId });
  if (like) {
    await Like.deleteOne({ nickname, commentId });
    return res.json({
      success: true,
      msg: '추천이 취소되었습니다.',
    });
  } else {
    await Like.create({ nickname, commentId });
    return res.json({ success: true, msg: '추천되었습니다.' });
  }
});

module.exports = router;
