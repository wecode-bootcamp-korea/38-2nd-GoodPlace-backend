const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/kakao/signin', userController.signIn);
router.post('/kakao/signup', userController.signUp);

module.exports = router;