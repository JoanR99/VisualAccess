const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const catchAsync = require('../utils/catchAsync');
const { validateUser } = require('../middleware');
const passport = require('passport');

router
  .route('/register')
  .get(user.renderRegister)
  .post(validateUser, catchAsync(user.register));

router
  .route('/login')
  .get(user.renderLogin)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirec: '/login',
    }),
    user.login
  );

router.get('/logout', user.logout);

module.exports = router;
