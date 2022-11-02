const { database } = require('./dataSource');
const { distanceFormulaForQuery, filterByOptionForQuery, sortByOptionForQuery, sortByPremiumForQuery, filterBySearchWordForQuery } = require('./functionForProduct');
const { priceEnum, findEmptyProductEnum, checkOverlabReservation } = require('./enum');

const getProductDistanceByUser = async ( latitude, longitude, distance, optionArray, premiumOption, sortBy, limit, offset, checkIn, checkOut, searchWord ) => {
  return await database.query(`
  SELECT
    *
  FROM
    (
    SELECT 
      data.id,
      data.address,
      data.thumbnail_url,
      data.name,
      data.latitude,
      data.longitude,
      data.is_premium,
      data.distance,
      data.T_price AS time_price,
      data.S_price AS stay_price,
      data.rating_avg AS avg_rating,
      data.rating_count AS count_rating,
      data.option_array,
      COUNT(check_in_date) AS cnt
    FROM
      (
      SELECT 
        p.id,
        p.address,
        p.thumbnail_url,
        p.name,
        p.latitude,
        p.longitude,
        p.is_premium,
        ${distanceFormulaForQuery( latitude, longitude )},
        date_data.check_in_date AS check_in_date,
        date_data.check_out_date AS check_out_date,
        ROUND ( ( minprice.price * ${priceEnum.T_PRICE_MULTIPLE} ) , -3 ) AS T_price,
        ROUND ( ( minprice.price * ${priceEnum.S_PRICE_MULTIPLE} ) , -3 ) AS S_price,
        rating.rating_avg,
        rating.rating_count,
        room_option.option_array
      FROM products AS p
      LEFT JOIN 
      (
        SELECT
          product_id,
          MIN( price ) AS price
        FROM rooms AS r
        GROUP BY product_id
      ) AS minprice
      ON minprice.product_id = p.id
      LEFT JOIN
      (
        SELECT
          product_id,
          AVG( rating ) AS rating_avg,
          COUNT( rating ) AS rating_count
        FROM rooms AS r
        INNER JOIN reviews AS re 
        ON r.id = re.room_id
        GROUP BY product_id
      ) AS rating
      ON rating.product_id = p.id
      LEFT JOIN
      (
        SELECT
          product_id,
          JSON_KEYS( 
            JSON_OBJECTAGG( 
              option_id, "" 
            ) 
          ) AS option_array
        FROM products AS p
        INNER JOIN rooms AS r
        ON r.product_id = p.id
        INNER JOIN rooms_options AS rsos
        ON rsos.room_id = r.id
        GROUP BY product_id
      ) AS room_option
      ON room_option.product_id = p.id
      LEFT JOIN
      (
        SELECT
          p.id AS p_id,
          p.name,
          r.id as r_id,
          r.name as r_name,
          check_date_data.check_in_date,
          check_date_data.check_out_date
        FROM products AS p
        LEFT JOIN rooms AS r
        ON p.id = r.product_id
        LEFT JOIN 
        (
          SELECT
          product_id,
          check_in_date,
          check_out_date,
          ord.room_id AS room_id
          FROM rooms AS r
          INNER JOIN orders AS ord
          ON r.id = ord.room_id
          WHERE ('${checkIn} ${checkOverlabReservation.BORROW_CONDITION_POINT_ONE}' < check_out_date 
          AND '${checkOut} ${checkOverlabReservation.BORROW_CONDITION_POINT_TWO}' > check_in_date)
          AND ('${checkIn} ${checkOverlabReservation.BORROW_CONDITION_POINT_TWO}'  < check_out_date
          AND '${checkOut} ${checkOverlabReservation.BORROW_CONDITION_POINT_THREE}' > check_in_date)
          AND ('${checkIn} ${checkOverlabReservation.BORROW_CONDITION_POINT_THREE}'  < check_out_date
          AND '${checkOut} ${checkOverlabReservation.BORROW_CONDITION_POINT_ONE}' > check_in_date)
        ) AS check_date_data
        ON check_date_data.room_id = r.id
        AND check_date_data.product_id = p.id
      ) AS date_data
      ON date_data.p_id = p.id
    ) AS data
    GROUP BY id
    ) AS filter_data
    WHERE distance <= ${distance}
    AND cnt < ${findEmptyProductEnum.EMPTY_PRODUCT_CONSTANT}
    ${filterByOptionForQuery( optionArray )}
    ${filterBySearchWordForQuery( searchWord )}
    ${sortByPremiumForQuery( premiumOption, sortByOptionForQuery( sortBy ) )}
    LIMIT ${offset}, ${limit}`
  );
}

const getProductNameBySearchWord = async ( searchWord ) => {
  return await database.query(`
  SELECT 
    id,
    name
  FROM products
  WHERE name LIKE '%${searchWord}%'`
  );
}

module.exports = {
  getProductDistanceByUser,
  getProductNameBySearchWord
}