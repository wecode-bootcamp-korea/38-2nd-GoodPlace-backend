const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const reviewRouter = require('./reviewRouter');
const productRouter = require('./productRouter');

router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/product', productRouter.router);

module.exports = router;