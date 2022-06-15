const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../functions/multer');
const userController = require('../controllers/users.controller');
require('dotenv').config();
require('express-async-errors');

const router = express.Router();

router.get('/myInfo', auth, userController.getMyInfo);

router.post('/myInfo', upload.single('image'), userController.postProfileImg);

router.post('/login', userController.postLogin);

router.post('/signup', userController.postSignup);

router.get('/profile', userController.getProfileImg);

module.exports = router;
