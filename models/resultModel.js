const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defineAccessibilityLevel = require('../helpers/defineAccessibilityLevel');

const specificResultSchema = new Schema({
  test: {
    type: String,
  },
  score: {
    type: Number,
  },
  element: {
    elementCount: {
      type: Number,
    },
    errorCount: {
      type: Number,
    },
  },
});

const resultSchema = new Schema({
  specificResults: [specificResultSchema],
  globalScore: {
    type: Number,
  },
  barrierCount: {
    type: Number,
  },
  globalElementCount: {
    type: Number,
  },
  globalErrorCount: {
    type: Number,
  },
});

resultSchema.virtual('accessibilityLevel').get(function () {
  return defineAccessibilityLevel(this.globalScore);
});

module.exports = mongoose.model('Result', resultSchema);
