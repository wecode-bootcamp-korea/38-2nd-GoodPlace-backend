const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { loginRequired } = require('../utils/auth');

router.get('/list', orderController.getAllOrderByUserId);
router.get('/:orderId', orderController.getOrderByOrderId);
router.post('/' , loginRequired, orderController.createOrder);
router.patch('/:orderId', loginRequired ,orderController.deleteOrder);

module.exports =  router 