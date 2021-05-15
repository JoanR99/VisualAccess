const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const formatDate = require('../helpers/formatDate');

const evaluationSchema = new Schema({
  page: {
    type: Schema.Types.ObjectId,
    ref: 'Page',
  },
  result: {
    type: Schema.Types.ObjectId,
    ref: 'Result',
  },
  disabilityProfile: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

evaluationSchema.virtual('profile').get(function () {
  if (this.disabilityProfile == 'totalBlind') {
    return 'Evaluación realizada para el perfil Ceguera Total';
  } else {
    return 'Evaluación realizada para el perfil Ceguera Parcial';
  }
});

evaluationSchema.virtual('evaluationDate').get(function () {
  return formatDate(this.date);
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
