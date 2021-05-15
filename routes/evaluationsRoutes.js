const express = require('express');
const router = express.Router();
const evaluations = require('../controllers/evaluationsControllers');

router.route('/').post(evaluations.createEvaluation);

router.get('/new', evaluations.renderNewForm);

router.route('/:id').get(evaluations.showEvaluation);

// router.get(
//   '/:id/edit',
//   isLoggedIn,
//   isAuthor,
//   catchAsync(campgrounds.renderEditForm)
// );

module.exports = router;
