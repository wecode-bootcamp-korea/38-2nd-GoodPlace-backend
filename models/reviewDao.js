const { database } = require('./dataSource');

const createReview = async ( userId, roomId, rating, content, imageUrl ) => {
  const review = await database.query(`
    INSERT INTO
      reviews
      (
        user_id,
        room_id,
        rating,
        content
      )VALUES(
        ?,
        ?,
        ?,
        ?
      )
  `, [ userId, roomId, rating, content ]);

    await database.query(`
        INSERT INTO
          review_images
          (
            review_id,
            image_url
          )VALUES(
            ?,
            ?
          )
    `,[ review.insertId, imageUrl])
  return review.insertId;
}

const getReviewByRoomId = async ( roomId ) => {
  return await database.query(`
      SELECT
        reviews.rating AS rating,
        reviews.content AS content,
        reviews.user_id AS userId,
        reviews.room_id AS roomId,
        review_images.image_url AS imageUrl
      FROM
        reviews
      JOIN review_images
        ON reviews.id = review_images.review_id
      WHERE reviews.room_id = ?

`, [ roomId ]) 
}

const updateReviewByRId = async ( reviewId, rating, content, imageUrl ) => {
  await database.query(`
  UPDATE reviews
    SET rating = ?,
      content = ?
    WHERE id = ?
  ` , [ rating, content, reviewId ])
  
  await database.query(`
    UPDATE review_images
      SET image_url = ?
    WHERE review_id = ?
  `, [ imageUrl, reviewId])
  
  return await database.query(`
    SELECT 
      reviews.rating AS rating,
      reviews.content AS content,
      review_images.image_url AS imageUrl
    FROM reviews
    JOIN review_images 
      ON reviews.id = review_images.review_id 
    WHERE reviews.id=?
    `, [ reviewId  ])
}

const deleteReview = async ( reviewId ) => {
  await database.query(`
  DELETE 
    FROM review_images
  WHERE review_id=?
  `, [ reviewId ])

  const deleteReviewId = await database.query(`
    DELETE
      FROM reviews
    WHERE id=?
    `, [ reviewId ])
    
    return deleteReviewId.insertId
}

const getCountCompareBetweenReviewOrder = async ( userId, roomId ) => {
  return await database.query(`
    SELECT
      (
        SELECT count(id)
          FROM reviews
        WHERE user_id=? AND room_id=?
      ) AS reviewCount,
      count(id) AS orderCount
    FROM orders
    WHERE user_id=? AND room_id=?
  `, [ userId, roomId, userId, roomId ])
}

module.exports = { createReview, getReviewByRoomId, updateReviewByRId, deleteReview, getCountCompareBetweenReviewOrder };