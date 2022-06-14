const express = require('express');
const router = express.Router();
const Users = require('../schemas/user');

router.get('/test', async (req, res) => {
  const users = await Users.find().exec();
  res.json({
    users,
  });
});

module.exports = router;
