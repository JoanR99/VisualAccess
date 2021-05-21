const request = require('request-promise');
const scanPage = require('./scanPage');
const barrierEvaluation = require('./barrierEvaluation');
const accessibilityLevelEvaluation = require('./accessibilityLevelEvaluation');

const evaluatePage = async (url, disabilityProfile) => {
  const response = await request(url);

  let { barrierVerificationSteps, barrierElement } = await scanPage(response);

  let barrierScores = barrierEvaluation(barrierVerificationSteps);

  let accessibilityLevel = accessibilityLevelEvaluation(
    barrierScores,
    disabilityProfile
  );

  let specificResults = [];
  let barrierCount = 0;
  let globalElementCount = 0;
  let globalErrorCount = 0;
  for (const barrier in barrierScores) {
    let barrierData = {
      test: barrier,
      score: barrierScores[barrier],
      element: barrierElement[barrier],
    };

    specificResults.push(barrierData);

    if (barrierElement[barrier] != null) {
      barrierCount++;
      globalElementCount += barrierElement[barrier].elementCount;
      globalErrorCount += barrierElement[barrier].errorCount;
    }
  }

  console.log(
    barrierVerificationSteps,
    barrierCount,
    barrierElement,
    barrierScores,
    accessibilityLevel
  );

  return {
    specificResults,
    globalScore: accessibilityLevel,
    barrierCount,
    globalElementCount,
    globalErrorCount,
  };
};

module.exports = evaluatePage;
