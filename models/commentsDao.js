const { database } = require('./dataSource');

const createComments = async ( userId, sellerId, reviewId, content ) => {
  const createComment = await database.query(`
    INSERT INTO
      review_comments
      (
        user_id,
        seller_id,
        review_id,
        content
      )VALUES(
        ?,
        ?,
        ?,
        ?
      )
  `, [ userId, sellerId, reviewId, content ])

  return createComment.insertId;
}

const getComments = async ( reviewId ) => {
  const comments = await database.query(`
    SELECT 
      user_id AS userId,
      seller_id AS sellerId,
      review_id AS reviewId,
      content
    FROM
      review_comments
    WHERE review_id=?
  `, [ reviewId ])

  return comments
}

const updateComments = async ( content, commentId ) => {
  await database.query(`
    UPDATE
      review_comments
    SET 
      content=?
    WHERE
     id=?
  `, [ content, commentId])
  
  const comments = await database.query(`
    SELECT
      user_id AS userId,
      review_id AS reviewId,
      content,
      id AS commentId
    FROM
      review_comments
    WHERE
      id = ?
  `, [ commentId]);
  return comments;
}

const deleteComments = async ( commentId ) => {
  const comments = await database.query(`
    DELETE
      FROM review_comments
    WHERE id=?
  `, [ commentId ])

  return comments.insertId
}
module.exports = { createComments, getComments, updateComments, deleteComments }