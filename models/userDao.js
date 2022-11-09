const { database } = require('./dataSource')

const createUser = async ( nickName, phoneNumber, kakaoId, email ) => {
  const user = await database.query(`
    INSERT INTO users 
    (
      nickname,
      phone_number,
      social_id,
      email
    )
    VALUES ( ?, ?, ?, ? );`,
    [ nickName, phoneNumber, kakaoId, email ]
  );
  return user.insertId;
}

const createSeller = async ( insertId, nickName, phoneNumber, kakaoId, email ) => {
  return await database.query(`
    INSERT INTO sellers 
    (
      user_id,
      nickname,
      phone_number,
      social_id,
      email
    )
    VALUES ( ?, ?, ?, ?, ? );`,
    [ insertId, nickName, phoneNumber, kakaoId, email ]
  );
}

const getUserBySocialId = async ( kakaoId ) => {
  const [ userId ] = await database.query(`
    SELECT 
      id
    FROM users
    WHERE social_id = ?`,
    [ kakaoId ]
  );
  return userId;
}
const getUserById = async (userId) => {
  return await database.query(`
    SELECT
      id AS userId,
      nickname AS nickName
    FROM users
    WHERE id = ${userId};
  `)
}

module.exports = { 
  createUser,
  createSeller,
  getUserBySocialId,
  getUserById
}