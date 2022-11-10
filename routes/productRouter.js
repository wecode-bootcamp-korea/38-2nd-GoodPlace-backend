const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/distance', productController.getProductDistanceByUser);
router.get('/roominfo', productController.getRoomInfoByProductId);
router.get('/roomimage', productController.getRoomImageByProductId);
router.get('/list', productController.getProductInfo);
router.get('/', productController.getProductNameBySearchWord);
router.get('/:productId', productController.getProductInfoByProductId);

module.exports = { router };
