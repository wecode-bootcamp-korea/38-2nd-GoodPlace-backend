const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { loginRequired } = require('../utils/auth');

router.get('/list', loginRequired, orderController.getAllOrderByUserId);
router.get('/:orderId', loginRequired, orderController.getOrderByOrderId);
router.post('/' , loginRequired, orderController.createOrder);
router.patch('/', loginRequired ,orderController.deleteOrder);

module.exports =  router 