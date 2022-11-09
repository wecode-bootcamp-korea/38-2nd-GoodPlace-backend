const commentesDao = require('../models/commentsDao');

const createComments = async ( userId, sellerId, reviewId, content ) => {
  
  const createComment = await commentesDao.createComments(userId, sellerId, reviewId, content)
  
  return createComment
}

const getComments = async ( reviewId ) => {
  const getComments = await commentesDao.getComments( reviewId )

  return getComments;
}

const updateComments = async ( content, commentId ) => {
  const comments = await commentesDao.updateComments( content, commentId );

  return comments;
}

const deleteComments = async ( commentId ) => {
  const comment = await commentesDao.deleteComments( commentId );

  return comment;
}
module.exports = { createComments, getComments, updateComments, deleteComments }