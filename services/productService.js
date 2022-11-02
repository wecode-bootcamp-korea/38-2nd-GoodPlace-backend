const productDao = require('../models/productDao');

const getProductDistanceByUser = async ( latitude, longitude, distance, optionArray, premiumOption, sortBy, limit, offset, checkIn, checkOut, searchWord ) => {

  if ( distance < 50 || distance > 30000) {
    const err = new Error('DISTANCE_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }
  
  const conversionDistance = distance / 1000;

  const productByUserCoordinate = await productDao.getProductDistanceByUser( latitude, longitude, conversionDistance, optionArray, premiumOption, sortBy, limit, offset, checkIn, checkOut, searchWord );

  return productByUserCoordinate;
};

const getProductNameBySearchWord = async ( searchWord ) => {

  const productList = await productDao.getProductNameBySearchWord( searchWord );

  return productList;
};

module.exports = {
  getProductDistanceByUser,
  getProductNameBySearchWord
}