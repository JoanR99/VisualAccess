const Page = require('../models/pageModel');
const Review = require('../models/reviewModel');

module.exports.createReview = async (req, res) => {
  const { id, evaluationId } = req.params;
  const page = await Page.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  page.reviews.push(review);
  await review.save();
  await page.save();
  req.flash('success', 'Created new review!');
  res.redirect(`/evaluation/${evaluationId}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId, evaluationId } = req.params;
  await Page.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted review!');
  res.redirect(`/evaluation/${evaluationId}`);
};
