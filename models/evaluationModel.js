const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const formatDate = require('../utils/formatDate');
const Result = require('./resultModel');

const evaluationSchema = new Schema({
  page: {
    type: Schema.Types.ObjectId,
    ref: 'Page',
  },
  result: {
    type: Schema.Types.ObjectId,
    ref: 'Result',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  disabilityProfile: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

evaluationSchema.virtual('profile').get(function () {
  if (this.disabilityProfile == 'totalBlind') {
    return 'Ceguera Total';
  } else {
    return 'Ceguera Parcial';
  }
});

evaluationSchema.virtual('evaluationDate').get(function () {
  return formatDate(this.date);
});

evaluationSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Result.deleteOne({
      _id: doc.result,
    });
  }
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
