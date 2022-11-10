const { database } = require('./dataSource');
const orderStatusEnums = require('./enum');

const createOrder = async ( userId , roomId, checkIn, checkOut, pointChange ) => {
  const queryRunner = database.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try{
    const data = await queryRunner.query ( `
      INSERT INTO orders
        (user_id,
          room_id,
          check_in_date,
          check_out_date)
        VALUES
        (?,?,?,?)
    `,[ userId, roomId, checkIn, checkOut ])

    await queryRunner.query(`
      UPDATE users
        SET point=?
      WHERE id=?
    ` , [ pointChange, userId])

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return data.insertId
    
  }catch (err){
    console.error(err);
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  }
}

const getAllOrderByUserId = async( userId ) => {

  const allOrderByUserId =  await database.query(`
    SELECT
      rooms.thumbnail_url AS thumbnail,
      products.name AS productName,
      order_statuses.description AS description,
      orders.id AS orderId,
      orders.check_in_date AS checkIn,
      orders.check_out_date AS checkOut
    FROM orders
    JOIN order_statuses ON orders.order_status_id=order_statuses.id
    JOIN rooms ON orders.room_id=rooms.id
    JOIN products ON products.id=rooms.product_id
    WHERE
      orders.user_id=?
  ` , [userId])
  
  return allOrderByUserId
}
const deleteOrder = async ( orderId, userId, roomPrice ) => {
  
  const queryRunner = database.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

    try{
    await queryRunner.query(`
      UPDATE
        orders
      SET
        order_status_id=?
      WHERE id = ? AND user_id=?
    `, [ orderStatusEnums.CANCELED, orderId, userId ])

    await queryRunner.query(`
      UPDATE
        users
      SET
        point=point+?
      WHERE id=?
    `, [ roomPrice, userId ])
      queryRunner.commitTransaction();
      queryRunner.release();
    }catch(err){
      console.error(err);
      queryRunner.rollbackTransaction();
      queryRunner.release();
    }
}

const getRoomPriceByRoomId = async ( roomId )=> {
  const [reuslt] = await database.query(`
    SELECT
      price
    FROM 
      rooms
    WHERE id=?
  `, [ roomId ])
  return reuslt 
}

const getCheckInDateByOrderId = async ( orderId )=>{
  return await database.query(`
    SELECT 
      check_out_date
    FROM orders
    WHERE id=?
  ` , [ orderId ])
}

const getOrderByOrderId = async ( orderId )=> {
  return await database.query(`
    SELECT
      products.name AS productName,
      rooms.name AS name,
      orders.check_in_date AS checkIn,
      orders.check_out_date AS checkOut,
      rooms.price AS price,
      order_statuses.description AS orderStatus,
      orders.id AS orderId,
      users.nickname AS userName,
      rooms.thumbnail_url AS imageUrl
    FROM orders
    JOIN rooms ON rooms.id=orders.room_id
    JOIN products ON products.id=rooms.product_id
    JOIN order_statuses ON orders.order_status_id=order_statuses.id
    JOIN users ON users.id=orders.user_id
    WHERE orders.id=?
  ` , [ orderId ])

}

const getDifferenceByOrderId = async (orderId) => {
  const [dateDifference] =  await database.query(`
    SELECT 
      id, 
      check_in_date, 
      DATEDIFF(CURDATE(), check_in_date) AS diffDate
    FROM goodplace.orders
    WHERE id=${orderId}
  `)
  return dateDifference;
}

const getOrderStatus = async ( orderId ) => {
  const [orderStatus] =  await database.query(`
    SELECT 
      order_status_id AS orderStatus
    FROM orders
    WHERE id=?
  ` , [ orderId ])
  return orderStatus;
}

const getUserPointByUserId = async ( userId ) => {
  const [result] = await database.query(`
  SELECT
    point
  FROM users
  WHERE id=?
  ` , [ userId ])
  return result
}

module.exports = { 
  createOrder, 
  deleteOrder, 
  getOrderByOrderId, 
  getAllOrderByUserId, 
  getCheckInDateByOrderId,
  getDifferenceByOrderId,
  getRoomPriceByRoomId,
  getOrderStatus,
  getUserPointByUserId
};