const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const formatDate = require('../utils/formatDate');

const reviewSchema = new Schema({
  message: String,
  rating: Number,
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

reviewSchema.virtual('reviewDate').get(function () {
  return formatDate(this.date);
});

module.exports = mongoose.model('Review', reviewSchema);
