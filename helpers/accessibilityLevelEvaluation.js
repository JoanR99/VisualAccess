const priorityLevel = require('./priorityLevel');

const accessibilityLevelEvaluation = (barrierScores, disabilityProfile) => {
  let accessibilityLevel;
  let firstSumOfEquation = 0;
  let secondSumOfEquation = 0;
  for (barrier in barrierScores) {
    if (barrierScores[barrier] === null) {
      continue;
    }
    firstSumOfEquation +=
      barrierScores[barrier] * priorityLevel[barrier][disabilityProfile];
    secondSumOfEquation += priorityLevel[barrier][disabilityProfile];
  }
  accessibilityLevel = (firstSumOfEquation / secondSumOfEquation) * 100;
  if (accessibilityLevel % 1 == 0) {
    return accessibilityLevel;
  } else {
    return Number.parseInt(accessibilityLevel.toFixed());
  }
};

module.exports = accessibilityLevelEvaluation;
