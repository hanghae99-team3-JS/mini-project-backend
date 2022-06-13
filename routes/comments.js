const express = require('express');
const auth = require('../middlewares/auth');
const Comments = require('../schemas/comments');
const AutoIncrement = require('mongoose-sequence');
/* const Joi = require('joi'); */
const router = express.Router();

/* const commentSchema = Joi.object({
  comment: Joi.string().required(),
});
 */
//댓글 조회
router.get('/posts/:postId/comments', async (req, res) => {
  // #swagger.tags = ['Comments']
  const { postId } = req.params;
  const comments = await Comments.find({ postId: Number(postId) }).sort({
    date: -1,
  });
  console.log(comments);
  res.json({
    comments,
  });
});

//댓글 작성
router.post('/posts/:postId/comment', auth, async (req, res) => {
  // #swagger.tags = ['Comments']
  try {
    const { nickname } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;

    if (comment === '') {
      res.status(400).send({
        errorMessage: '댓글 내용을 입력해주세요',
      });
      return;
    }

    const maxCommentId = await Comments.findOne().sort('-commentId').exec();
    let commentId = 1;

    if (maxCommentId) commentId = maxCommentId.commentId + 1;

    await Comments.create({
      commentId,
      postId,
      nickname,
      comment,
      date: new Date(),
    });

    res.status(201).json({ msg: '등록되었습니다.' });
  } catch (error) {
    res.status(400).send({
      errorMessage: '에러 발생',
    });
    return;
  }
});

//댓글 수정
router.put('/posts/:postId/comment/:commentId', auth, async (req, res) => {
  // #swagger.tags = ['Comments']
  const { nickname } = res.locals.user;
  const { commentId } = req.params;
  const { comment } = req.body;

  const checkComment = await Comments.findOne({ commentId: Number(commentId) });
  if (checkComment['nickname'] !== nickname) {
    return res
      .status(400)
      .send({ success: false, errorMessage: '수정할 수 없습니다.' });
  }

  await Comments.updateOne(
    { commentId: Number(commentId) },
    { $set: { comment } }
  );
  res.json({ success: '수정 되었습니다.' });
});

//댓글 삭제
router.delete('/posts/:postId/comment/:commentId', auth, async (req, res) => {
  // #swagger.tags = ['Comments']
  const { nickname } = res.locals.user;
  const { commentId } = req.params;
  const { comment } = req.body;

  const checkComment = await Comments.findOne({ commentId: Number(commentId) });
  if (checkComment['nickname'] !== nickname) {
    return res
      .status(400)
      .send({ success: false, errorMessage: '삭제할 수 없습니다.' });
  }

  await Comments.deleteOne({ commentId });

  res.json({
    success: true,
    msg: '삭제되었습니다.',
  });
});

module.exports = router;
