const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { loginRequired } = require('../utils/auth');
const { imageUploader } = require('../utils/imageUploader');



router.post('/', loginRequired, imageUploader.single('image'), reviewController.createReview );
router.get('/:roomId', reviewController.getReviewByRoomId );
router.delete('/:reviewId', loginRequired, reviewController.deleteReview );
router.patch('/:reviewId' , loginRequired, imageUploader.single('image'), reviewController.updateReviewByRId );


module.exports = router;