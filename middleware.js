const { reviewSchema, userSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Evaluation = require('./models/evaluationModel');
const Page = require('./models/pageModel');
const Review = require('./models/reviewModel');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Debes iniciar sesión.');
    return res.redirect('/login');
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const evaluation = await Evaluation.findById(id);
  if (!evaluation) {
    req.flash('error', '¡No existe esa evaluación!');
    return res.redirect(`/`);
  }
  if (!evaluation.author.equals(req.user._id)) {
    req.flash('error', '¡No tienes permiso para hacer esto!');
    return res.redirect(`/`);
  }
  next();
};

module.exports.pageExists = async (req, res, next) => {
  const { pageId } = req.params;
  const page = await Page.findById(pageId);
  if (!page) {
    req.flash('error', '¡No existe esa página!');
    return res.redirect(`/`);
  }
  next();
};
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash('error', '¡No tienes permiso para hacer esto!');
    return res.redirect(`/evaluation/${id}`);
  }
  next();
};
