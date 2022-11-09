const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const reviewRouter = require('./reviewRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const commentsRouter = require('./commentsRouter');

router.use('/order', orderRouter);
router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/product', productRouter.router);
router.use('/user', userRouter);

module.exports = router;