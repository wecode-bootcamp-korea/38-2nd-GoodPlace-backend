const reviewService = require('../services/reviewService');
const { catchAsync } = require('../utils/error');

const createReview = catchAsync( async( req, res ) => {
  const { userId }  = req.user;
  const { roomId, rating, content } = req.body;
  if( !userId || !roomId || !rating || !content){
    const error = new Error('YOUR_REQUEST_IS_DANGEROUS');
    error.statusConde = 400;
    throw error;
  }
  const imageUrl = req.file.location;

  const review = await reviewService.createReview( +userId, +roomId, +rating, content, imageUrl );

  res.status(201).json({reviewId : review});

})

const getReviewByRoomId = catchAsync( async ( req, res ) => {
  const { roomId } = req.params;

  const reviewsOfRooms = await reviewService.getReviewByRoomId( +roomId );

  res.status(200).json({ reviewsOfRooms });
})

const updateReviewByRId = catchAsync( async ( req, res ) => {
  const { userId } = req.user;
  const { rating, content } = req.body;
  const {reviewId} = req.params;
  const imageUrl = req.file.location;

  const updatedReview = await reviewService.updateReviewByRId( +reviewId, +rating, content, +userId, imageUrl );

  res.status(201).json({ updatedReviewId: updatedReview });
})

const deleteReview = catchAsync( async( req, res ) => {
  const { reviewId } = req.params;

  await reviewService.deleteReview( +reviewId );
  res.status(200).json({ message : 'deleteComplete' })
})



module.exports = { createReview, getReviewByRoomId, deleteReview, updateReviewByRId };