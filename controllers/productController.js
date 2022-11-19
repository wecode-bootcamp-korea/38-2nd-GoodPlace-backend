const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProductDistanceByUser = catchAsync(async (req, res) => {
  const { latitude, longitude, distanceMeter, optionArray, limit, offset, checkIn, checkOut } = req.query;
  const userType = req.userType;
  let sortBy = req.query.sortBy ? req.query.sortBy : 'default';
  let searchWord = req.query.search ? req.query.search : 'default';
  let premiumOption = req.query.premiumOption ? req.query.premiumOption : 'default';

  const CHECK_DAY_REGEX = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  
  if ( !latitude || !longitude || !distanceMeter || !limit || !offset || !checkIn || !checkOut ) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }
  
  if ( !Number.isFinite(+latitude) || !Number.isFinite(+longitude) || !Number.isInteger(+distanceMeter) || !Number.isInteger(+limit) || !Number.isInteger(+offset) ) {
    const err = new Error('INPUT_DATA_IS_NOT_NUMBER');
    err.statusCode = 400;
    throw err;
  }
  
  if ( !CHECK_DAY_REGEX.test(checkIn) || !CHECK_DAY_REGEX.test(checkOut) || Date.parse(checkOut)-Date.parse(checkIn) < 0 ){
    const err = new Error('CHECK_IN_OUT_TIME_IS_NOT_VALID')
    err.statusCode = 400
    throw err
  }

  if ( limit < 0 || offset < 0 || offset % limit !== 0 ) {
    const err = new Error('OFFSET_DATA_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  if ( userType !== 'admin' ) {
    premiumOption = 'descPremium';
  }
  
  if ( sortBy !== 'ascPrice' && sortBy !== 'descPrice' && sortBy !== 'ascDistance' && sortBy !== 'descDistance' && sortBy !== 'default' ) {
    const err = new Error('SORT_OPTION_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  if ( premiumOption !== 'ascPremium' && premiumOption !== 'descPremium' && premiumOption !== 'default' ) {
    const err = new Error('PREMIUM_OPTION_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  if ( !optionArray ) {
    const optionArray = [];
    const productByUserCoordinate = await productService.getProductDistanceByUser( +latitude, +longitude, +distanceMeter, optionArray, premiumOption, sortBy, +limit, +offset, checkIn, checkOut, searchWord );

    res.status(200).json({ 'productInfo' : productByUserCoordinate });
  } else {
    const productByUserCoordinate = await productService.getProductDistanceByUser( +latitude, +longitude, +distanceMeter, JSON.parse(optionArray), premiumOption, sortBy, +limit, +offset, checkIn, checkOut, searchWord );

    res.status(200).json({ 'productInfo' : productByUserCoordinate });
  }

});

const getProductNameBySearchWord = catchAsync(async (req, res) => {
  const searchWord = req.query.search;
  
  const productList = await productService.getProductNameBySearchWord( searchWord );

  res.status(200).json({ 'productInfo' : productList });
});

const getProductInfoByProductId = catchAsync(async(req, res) => {
    const { productId } = req.params;
 
    if(!productId) {
        const error = new Error('PRODUCTID IS MISSING ERROR');
        error.statusCode = 400;
    
        throw error;
    };

    const productInfo = await productService.getProductInfoByProductId(productId);
    res.status(200).json({productInfo});
});

const getRoomInfoByProductId = catchAsync(async(req, res) => {
    const { productId, checkIn, checkOut } = req.query;

    if(!productId) {
        const error = new Error('KEY ERROR');
        error.statusCode = 400;

        throw error;
    };
        const roomInfo = await productService.getRoomInfoByProductId(productId, checkIn, checkOut);
        res.status(200).json({ roomInfo });
});

const getRoomImageByProductId = catchAsync(async(req, res) => {
    const { productId, roomId } = req.query;

    if(!productId || !roomId) {
        const error = new Error('KEY ERROR');
        error.statusCode = 400;

        throw error;
    };
        const roomImage = await productService.getRoomImageByProductId(productId, roomId);
        res.status(200).json({ roomImage });
});

const getProductInfo = catchAsync(async(req, res) => {
    const { offset, limit, subCategoryId, optionArray } = req.query;
    let sortBy = req.query.sortBy ? req.query.sortBy : 'default';
   
    if(!offset || !limit || !subCategoryId || !optionArray) {
        const error = new Error('KEY ERROR');
        error.statusCode = 400;

        throw error;
    };
    if ( sortBy !== 'ascPrice' && sortBy !== 'descPrice' && sortBy !== 'popularity' && sortBy !== 'default' ) {
      const err = new Error('SORT_OPTION_IS_NOT_VALID');
      err.statusCode = 400;
      throw err;
    }

    const productInfo = await productService.getProductInfo(offset, limit, sortBy, subCategoryId, optionArray);
    res.status(200).json({ productInfo });
});

module.exports = {
    getProductDistanceByUser,
    getProductNameBySearchWord,
    getProductInfoByProductId,
    getRoomInfoByProductId,
    getRoomImageByProductId,
    getProductInfo
}