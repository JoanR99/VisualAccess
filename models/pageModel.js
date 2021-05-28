const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  url: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

module.exports = mongoose.model('Page', pageSchema);
