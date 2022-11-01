const jwt = require('jsonwebtoken');
const requestPromise = require('request-promise');
const userDao = require('../models/userDao');

const signIn = async ( code ) => {
  const { API_KEY, REDIRECT_URI } = process.env;

  const getKakaoTokenOption = {
    uri: "https://kauth.kakao.com/oauth/token",
    method: "POST",
    form: {
      grant_type: "authorization_code",
      client_id: API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code
    },
    headers: {
        "content-type" : "application/x-www-form-urlencoded"
    },
    json: true
  }

  const getKakaoToken = await requestPromise(getKakaoTokenOption);
  const KAKAO_TOKEN = getKakaoToken['access_token'];

  const getKakaoUserOption = {
    uri: "https://kapi.kakao.com/v2/user/me",
    method: "POST",
    headers: {
        "content-type" : "application/x-www-form-urlencoded",
        "Authorization" : `Bearer ${KAKAO_TOKEN}`
    },
    json: true
  }

  const kakaoUserInfo = await requestPromise(getKakaoUserOption);

  if ( !kakaoUserInfo.id ) {
    const err = new Error('KAKAO_ID_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const user = await userDao.getUserBySocialId( kakaoUserInfo.id );

  const KAKAO_EMAIL = kakaoUserInfo.kakao_account.email;

  if ( !user ) {
    const kakaoUserData = {
      id : kakaoUserInfo.id,
      email : KAKAO_EMAIL ? KAKAO_EMAIL : ""
    }
    
    return kakaoUserData;
  } else {
    const userId = user.id;

    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, 
      { 
        algorithm: process.env.JWT_ALGORYTHM,
        expiresIn: process.env.JWT_EXPIRES_IN 
      }
    );

    return accessToken;
  }
}

const signUp = async ( kakaoId, nickName, userType, phoneNumber, email ) => {
  const insertId = await userDao.createUser( nickName, phoneNumber, kakaoId, email );

  if ( userType === 'seller' ) {
    return await userDao.createSeller( insertId, nickName, phoneNumber, kakaoId, email );
  }

  return insertId;
}

module.exports = {
  signIn,
  signUp
}