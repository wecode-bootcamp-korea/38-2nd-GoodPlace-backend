const express = require('express');
const router = express.Router();
const  commentsController  = require('../controllers/commentsController');
const { loginRequired } = require('../utils/auth');

router.post('/:reviewId', loginRequired ,commentsController.createComments);
router.get('/:reviewId', commentsController.getComments);
router.patch('/:commentId', loginRequired, commentsController.updateComments);
router.delete('/:commentId', loginRequired, commentsController.deleteComments);

module.exports = router;