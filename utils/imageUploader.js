const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

AWS.config.update({
  region: process.env.AWS_S3_REGEION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY_ID
});

const s3 = new AWS.S3();

const allowedExtensions = ['.jpg','.png','.jpeg','.bmp','.JPG','.PNG','.JPEG','.BMP'];

  const imageUploader = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'goodplace-image',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, callback) => {
        const uploadDirectory = req.query.directory ?? ''
        const extension = path.extname(file.originalname)
        if(!allowedExtensions.includes(extension)){
          return callback(new Error('wrong extension'))
        }
        callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
      },
      acl: 'public-read-write'
    }),
})

module.exports = { imageUploader , s3 };
