const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signIn = catchAsync (async (req, res) => {
  const { code } = req.query;
  
  if ( !code ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const tokenOrKakaoCode = await userService.signIn( code );
  
  res.status(200).json({ "data" : tokenOrKakaoCode });
});

const signUp = catchAsync (async (req, res) => {
  const { kakaoId, nickName, userType, phoneNumber, email } = req.body;

  if ( !kakaoId || !nickName || !userType || !phoneNumber ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  if ( userType !== 'user' && userType !== 'seller' ) {
    const err = new Error('USER_TYPE_IS_NOT_VAILD');
    err.statusCode = 400;
    throw err;
  }

  await userService.signUp( kakaoId, nickName, userType, phoneNumber, email );

  res.status(200).json({ "data" : `create ${userType} success` });
});

module.exports = {
    signIn,
    signUp
}