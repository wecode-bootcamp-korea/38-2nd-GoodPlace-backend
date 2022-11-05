const reviewDao = require('../models/reviewDao')

const createReview = async ( userId, roomId, rating, content, imageUrl ) => {

  const reviewOrderDiff = await reviewDao.getCountCompareBetweenReviewOrder( userId, roomId );
  
  
  const [{reviewCount ,orderCount}] = reviewOrderDiff;
    if( orderCount - reviewCount > 0) {
      const review = await reviewDao.createReview( userId, roomId, rating, content, imageUrl );

      return review;
    } else{
      const error =  new Error('YOU_CAN_NOT_WRITE_REVIEW');
      error.statusCode = 400;
      throw error;
    }
}

const getReviewByRoomId = async ( roomId ) => {
  const reviewsOfRooms = reviewDao.getReviewByRoomId( roomId );

  return reviewsOfRooms;
}

const updateReviewByRId = async( reviewId, rating, content, imageUrl ) => {
  const updatedReview = await reviewDao.updateReviewByRId( reviewId, rating, content, imageUrl );

  return updatedReview;
}


const deleteReview = async ( reviewId ) => {
  const deleteReviewId = reviewDao.deleteReview( reviewId );

  return deleteReviewId;
}




module.exports = { createReview, getReviewByRoomId, deleteReview, updateReviewByRId };