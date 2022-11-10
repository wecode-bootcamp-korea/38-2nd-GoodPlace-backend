const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/distance', productController.getProductDistanceByUser);
router.get('/', productController.getProductNameBySearchWord);

module.exports = { router };

