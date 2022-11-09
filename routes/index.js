const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const reviewRouter = require('./reviewRouter');

router.use('/user', userRouter);
router.use('/review', reviewRouter);

module.exports = router;