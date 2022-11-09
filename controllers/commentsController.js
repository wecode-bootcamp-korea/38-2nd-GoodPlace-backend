const commentsService = require('../services/commentsService');
const { catchAsync } = require('../utils/error');

const createComments = catchAsync( async ( req, res ) => {
      const userId = req.user.userId;
      const { sellerId, content } = req.body;
      const { reviewId } = req.params

      if(!sellerId && !content && !reviewId){
      const createComment = await commentsService.createComments( +userId, +sellerId, +reviewId, content );
      
      res.status(201).json({ createComment });
    }else{
      const error = new Error('YOUR_REQUEST_IS_DANGEROUS');
      error.statusCode = 400;
      throw error;
    }
  }
)

const getComments = catchAsync( async ( req, res ) => {
  const { reviewId } = req.params;

  const comments = await commentsService.getComments( +reviewId );

  res.status(200).json({ comments });
})

const updateComments = catchAsync( async ( req, res ) => {
  const { content } = req.body;
  const { commentId } = req.params;

  if( !content && !commentId){
  const comments = await commentsService.updateComments( content, +commentId );

  res.status(200).json({ comments });
  }else{
    const error = new Error('YOUR_ERROR_IS_DANGEROUS');
    error.statusCode = 400;
    throw error;
  }
})

const deleteComments = catchAsync( async ( req, res ) => {
  const { commentId } = req.params;

  await commentsService.deleteComments( +commentId );

  res.status(200).json({ 'message' : 'delete_Success'});
})
module.exports = { createComments, getComments, updateComments, deleteComments }