const { database } = require('./dataSource');
const { distanceFormulaForQuery, filterByOptionForQuery, sortByOptionForQuery, sortByPremiumForQuery, filterBySearchWordForQuery, orderBySortForQuery } = require('./functionForProduct');
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
};

const getProductInfoByProductId = async(productId) => {

    const productInfo = await database.query(`
        SELECT
            products.id,
            products.name,
            products.thumbnail_url,
            products.address,
            products.description,
            rating.avg_rating as avg_rating,
            rating.count_rating as count_rating,
            product_images
        FROM products
        INNER JOIN rooms ON rooms.product_id = products.id
        INNER JOIN reviews ON reviews.room_id = rooms.id
        LEFT JOIN
        (
            SELECT
                product_id,
                avg(rating) as avg_rating,
                count(rating) as count_rating
            FROM rooms
            INNER JOIN reviews ON rooms.id = reviews.room_id
            INNER JOIN products ON products.id = rooms.product_id
            WHERE products.id = ${productId}
            GROUP BY product_id
        ) as rating
        ON rating.product_id = products.id
        INNER JOIN
        (
            SELECT
                product_id,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "id", id,
                        "url", image_url
                    )
                ) as product_images
            FROM product_images
            GROUP BY product_id
        ) product_images ON product_images.product_id = products.id
        WHERE products.id = ${productId}
        GROUP BY products.id;
    `);

    return productInfo;
};

const getRoomInfoByProductId = async(productId, checkIn, checkOut) => {

    const roomInfo = await database.query(`
        SELECT
            *
        FROM
        (
            SELECT
                p.id as productId,
                p.name,
                r.id as roomId,
                r.name as roomName,
                r.description as roomDescription,
                r.thumbnail_url as roomThumbnailUrl,
                date_data.check_in_date AS checkInReserved,
                date_data.check_out_date AS checkOutReserved,
                ROUND(r.price * ${priceEnum.T_PRICE_MULTIPLE}, -3) AS timePrice,
                ROUND(r.price * ${priceEnum.S_PRICE_MULTIPLE}, -3) AS stayPrice
            FROM products AS p
            LEFT JOIN rooms AS r ON p.id = r.product_id
            LEFT JOIN 
            (
                SELECT
                    product_id,
                    DATE_FORMAT(check_in_date, '%y-%m-%d %H') AS check_in_date,
                    DATE_FORMAT(check_out_date, '%y-%m-%d %H') AS check_out_date,
                    ord.room_id AS room_id
                FROM rooms AS r
                LEFT JOIN orders AS ord ON r.id = ord.room_id
                WHERE ('${checkIn} ${checkOverlabReservation.BORROW_CONDITION_POINT_ONE}' < check_out_date 	
                AND '${checkOut} ${checkOverlabReservation.BORROW_CONDITION_POINT_TWO}' > check_in_date)		
                AND ('${checkIn} ${checkOverlabReservation.BORROW_CONDITION_POINT_TWO}' < check_out_date	
                AND '${checkOut} ${checkOverlabReservation.BORROW_CONDITION_POINT_THREE}' > check_in_date)
                AND ('${checkIn} ${checkOverlabReservation.BORROW_CONDITION_POINT_THREE}' < check_out_date
                AND '${checkOut} ${checkOverlabReservation.BORROW_CONDITION_POINT_ONE}' > check_in_date)
            ) AS date_data
            ON date_data.room_id = r.id
            AND date_data.product_id = p.id
            ) AS data
            WHERE productId = ${productId}
        
    `);
    
    return roomInfo;
};

const getRoomImageByProductId = async(productId, roomId) => {

    const roomImage = await database.query(`
        SELECT
            room_id,
            image_url
        FROM room_images
        INNER JOIN rooms ON rooms.id = room_images.room_id
        INNER JOIN products ON products.id = rooms.product_id
        WHERE products.id = ${productId} AND room_images.room_id = ${roomId}
    `);
    
    return roomImage;
};

const getProductInfo = async(offset, limit, sortBy, subCategoryId) => {
    
    const productInfo = await database.query(`
        SELECT
            products.name,
            products.thumbnail_url,
            products.address,
            products.id,
            products.latitude,
            products.longitude,
            products.is_premium,
            ROUND(price.minPrice * ${priceEnum.T_PRICE_MULTIPLE}, -3) AS time_price,
            ROUND(price.minPrice * ${priceEnum.S_PRICE_MULTIPLE}, -3) AS stay_price,
            rating.avg_rating AS avg_rating,
            rating.count_rating AS count_rating,
            optionTable.option_id as option_id
        FROM products
        INNER JOIN sub_categories ON products.sub_category_id = sub_categories.id
        LEFT JOIN
        (
            SELECT
                product_id,
                MIN(price) AS minPrice
            FROM rooms
            GROUP BY rooms.product_id
        ) AS price
        ON price.product_id = products.id
        LEFT JOIN
        (
            SELECT
                product_id,
                avg(rating) as avg_rating,
                count(rating) as count_rating
            FROM rooms
            INNER JOIN reviews ON rooms.id = reviews.room_id
            GROUP BY product_id
        ) as rating
        ON rating.product_id = products.id
        LEFT JOIN 
        (
            SELECT
                product_id,
                JSON_KEYS(
                    JSON_OBJECTAGG(
                        option_id, ""
                    )
                ) as option_id
            FROM products
            INNER JOIN rooms ON rooms.product_id = products.id
            INNER JOIN rooms_options ON rooms_options.room_id = rooms.id
            GROUP by product_id
        ) AS optionTable
        ON optionTable.product_id = products.id
        WHERE sub_categories.id = ${subCategoryId}
        ${orderBySortForQuery(sortBy)}
        LIMIT ${offset}, ${limit};`
    );

    return productInfo;
};

module.exports = {
    getProductDistanceByUser,
    getProductInfoByProductId,
    getRoomInfoByProductId,
    getProductInfo,
    getRoomImageByProductId,
    getProductNameBySearchWord
}