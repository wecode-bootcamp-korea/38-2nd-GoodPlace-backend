const orderDao = require('../models/orderDao');
const orderStatusEnums = require('../models/enum');

const createOrder = async ( userId, roomId, checkIn, checkOut ) => {

  const roomPrice = await orderDao.getRoomPriceByRoomId( roomId );
  
  const userPoint = await orderDao.getUserPointByUserId( userId );
 
  let pointChange = Number(userPoint.point - roomPrice.price);

  if( !userPoint ){
    const err = new Error('USER_POINT_IS_EMPTY');
    err.statusCode = 400;
    throw err;
  }

  if( pointChange < 0){
    const err = new Error('PLEASE_ADD_YOUR_POINT');
    err.statusCode = 400;
    throw err;
  }

  if( pointChange ) {
    const ORDER_STATUS = orderStatusEnums.RESERVED

    const orderData = await orderDao.createOrder( userId , roomId, checkIn, checkOut, pointChange, ORDER_STATUS);
    return orderData;
  }

}

const deleteOrder = async ( orderId, userId, roomId ) => {

  const orderStatusId = await orderDao.getOrderStatus(+orderId);
  const orderStatus = orderStatusEnums.RESERVED
  if(orderStatusId.orderStatus === orderStatus){

  const getDifferenceByOrderId = await orderDao.getDifferenceByOrderId(+orderId);

  const diffCheckIn = +getDifferenceByOrderId.diffDate

  const roomPrice = await orderDao.getRoomPriceByRoomId( +roomId );
    if(diffCheckIn === -1 || diffCheckIn === 0){
      await orderDao.deleteOrder( +orderId, +userId, +(roomPrice.price)/2 );
    } else if(diffCheckIn < -1){
      await orderDao.deleteOrder( +orderId, +userId, +roomPrice.price );
    } else{
      const error = new Error('YOU_CAN_NOT_CANCEL');
      error.statusCode = 400;
      throw error;
    }
  } 
  else{
    const error = new Error('Youcannot cancel')
    error.statusCode = 400;
    throw error;
  }
}
const getOrderByOrderId = async ( orderId ) => {
  const getOrder = await orderDao.getOrderByOrderId( +orderId );
  let changeISOCheckIn = getOrder[0].checkIn.toISOString();
  let changeISOCheckOut = getOrder[0].checkOut.toISOString();
  let priceMultiple = Math.floor((Date.parse(changeISOCheckOut)-Date.parse(changeISOCheckIn))/1000/60/60);
  const deleteTCheckIn = changeISOCheckIn.replace('T' , ' ').replace('.000Z','');

  const deleteTCheckOut = changeISOCheckOut.replace('T',' ').replace('.000Z','');
  
  const checkIn = String(deleteTCheckIn.split(':').slice(0,-1)).replace(',',':');
  const checkOut = String(deleteTCheckOut.split(':').slice(0,-1)).replace(',',':');

  getOrder[0].checkIn = checkIn;
  getOrder[0].checkOut = checkOut;
  getOrder[0].price *= priceMultiple;

  return getOrder;
}

const getAllOrderByUserId = async ( userId ) => {
  
  const getOrder =  await orderDao.getAllOrderByUserId( userId )

  for( let i = 0; i< getOrder.length; i++){
    let deleteTCheckIn = getOrder[i].checkIn.toISOString().replace('T',' ').replace('.000Z','');
    let deleteTCheckOut = getOrder[i].checkOut.toISOString().replace('T', ' ').replace('.000Z','');  
    getOrder[i].checkIn = deleteTCheckIn;
    getOrder[i].checkOut = deleteTCheckOut;
  }
  return getOrder;
}

module.exports = { createOrder, deleteOrder, getOrderByOrderId, getAllOrderByUserId }