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

const getProductInfoByProductId = async(productId) => {
    return await productDao.getProductInfoByProductId(productId);
};

const getRoomInfoByProductId = async(productId, checkIn, checkOut) => {
    
    const list = await productDao.getRoomInfoByProductId(productId, checkIn, checkOut);

    let count1 = 0;
    let count2 = 0;
    let resultArr = [];
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
  
    let subResult = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

    for(let i = 0; i < list.length; i++) {
        
        const checkInreserved = !list[i].checkInReserved ? null : list[i].checkInReserved?.split(" ")[1];
        
        const checkOutreserved = !list[i].checkOutReserved ? null : list[i].checkOutReserved.split(" ")[1];

        if((i<list.length-1) && (list[i].roomId == list[i+1].roomId)) {
            if ((12 <= +checkInreserved || +checkInreserved <= 16)) { 
                count1++
            }
            else if ((+checkOutreserved == 12)) {
                count2++
            }
        }

        if((count1 < subResult+1) && (count2 == 0)) {

            if ( list[i]['checkInReserved'] !== null ) {
                list[i]['timePrice'] = null;
                list[i]['stayPrice'] = null;
            }

            resultArr.push(list[i]);
            
            if(resultArr[i].roomId == list[i].roomId) {
                count1 = 0;
                count2 = 0;
            }
        }
        else if((count1 < subResult+1) && (count2 > 0)){
            delete list[i].timePrice;
            resultArr.push(list[i]);

            if(resultArr[i].roomId == list[i].roomId) {
                count1 = 0;
                count2 = 0;
            }
        }
        else if((count2 == 0) && (count1 > subResult)) {
            delete list[i].stayPrice;
            resultArr.push(list[i]);

            if(resultArr[i].roomId == list[i].roomId) {
                count1 = 0;
                count2 = 0;
            }
        }
        else if((count1 > subResult) && (count2 >= 1)) {
            delete list[i].timePrice;
            delete list[i].stayPrice;
            resultArr.push(list[i]);

            if(resultArr[i].roomId == list[i].roomId) {
                count1 = 0;
                count2 = 0;
            }
        }
    }
    const solidx = resultArr.map((el) => el.roomId);
    const solArr = resultArr.filter((el, idx) => solidx.indexOf(el.roomId) === idx);

    return solArr;
};

const getRoomImageByProductId = async(productId, roomId) => {
    return await productDao.getRoomImageByProductId(productId, roomId);
};

const getProductInfo = async(offset, limit, sortBy, subCategoryId, optionArray) => {

    const products = await productDao.getProductInfo(+offset, +limit, sortBy, subCategoryId);

    optionArray = JSON.parse(optionArray); 
   
    if(optionArray.length){
        
        const arr = [];
    
        for(let i = 0; i < products.length; i++) {
    
            if(!products[i].option_id) {
                continue
            }
            let count = 0;
            
            for(let j = 0; j < optionArray.length; j++ ){
                if(products[i].option_id.includes(optionArray[j])) count++;
            };
            
            if(count === optionArray.length) {
                arr.push(products[i]);
            };
        };

        return arr;
    }
    else {
        return products;
    };
};

module.exports = {
    getProductDistanceByUser,
    getProductNameBySearchWord,
    getProductInfoByProductId,
    getRoomInfoByProductId,
    getRoomImageByProductId,
    getProductInfo
}