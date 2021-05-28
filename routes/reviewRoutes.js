const express = require('express');
const router = express.Router({ mergeParams: true });
const review = require('../controllers/reviewController');
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post(
  '/:evaluationId',
  isLoggedIn,
  validateReview,
  catchAsync(review.createReview)
);

router.delete(
  '/:reviewId/:evaluationId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(review.deleteReview)
);

module.exports = router;
