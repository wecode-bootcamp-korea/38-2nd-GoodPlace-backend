const orderService = require('../services/orderService');
const { catchAsync } = require('../utils/error');

const createOrder = catchAsync(async( req, res )=> {
  const  userId  = req.user.userId;
  const { roomId, checkIn, checkOut } = req.body;
  
  if( !req.body.roomId || !req.body.checkIn || !req.body.checkOut){
    const error = new Error('CHECK_YOUR_BODY');
    error.statusCode = 401;
    throw error;
  }
  const result = await orderService.createOrder( +userId, +roomId, checkIn, checkOut );

  res.status(201).json({message : "RESERVATION COMPLETE", orderId: result});
})

const deleteOrder = catchAsync(async ( req, res )=> {
  const  userId  = req.user.userId;
  const { orderId , roomId } = req.query;
  await orderService.deleteOrder( +orderId, +userId, +roomId );

  res.status(200).json({ message: "DELETE SUCCESS"});
})

const getOrderByOrderId = catchAsync(async ( req, res )=> {
  const { orderId } = req.params;
  const orderByUserId = await orderService.getOrderByOrderId( +orderId );

  res.status(200).json({ orderByUserId });
})

const getAllOrderByUserId = catchAsync(async( req, res )=> {
  // const  userId  = req.user.userId;
  const { userId } = req.query;

  const allOrderByUserId = await orderService.getAllOrderByUserId( +userId );

  res.status(200).json({allOrderByUserId})
})
module.exports = { createOrder, deleteOrder, getOrderByOrderId, getAllOrderByUserId };