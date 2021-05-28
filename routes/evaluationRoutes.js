const express = require('express');
const router = express.Router();
const evaluation = require('../controllers/evaluationControllers');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, pageExists } = require('../middleware');

router.post('/', catchAsync(evaluation.createEvaluation));

router.get('/new', evaluation.renderNewForm);

router.get(
  '/history/:pageId',
  isLoggedIn,
  pageExists,
  catchAsync(evaluation.showSpecificHistory)
);

router.get('/history', isLoggedIn, catchAsync(evaluation.showHistory));

router
  .route('/:id')
  .get(isLoggedIn, isAuthor, catchAsync(evaluation.showEvaluation))
  .delete(isLoggedIn, isAuthor, catchAsync(evaluation.deleteEvaluation));

module.exports = router;
