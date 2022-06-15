const express = require('express');
const router = express.Router();
const Users = require('../schemas/user');
const Posts = require('../schemas/posts');

router.get('/test', async (req, res) => {
  const users = await Users.find().exec();
  res.json({
    users,
  });
});

router.get('/test2', async (req, res) => {
  const posts = await Posts.find().exec();
  res.json({
    posts,
  });
});

module.exports = router;
