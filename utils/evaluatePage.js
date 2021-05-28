const getPage = require('./getPage');
const applyTests = require('./applyTests');
const barrierEvaluation = require('./barrierEvaluation');
const accessibilityLevelEvaluation = require('./accessibilityLevelEvaluation');

const evaluatePage = async (url, disabilityProfile) => {
  const document = await getPage(url);

  const results = await applyTests(document);

  if (results) {
    const { barrierVerificationSteps, barrierElementCount, barrierErrorCount } =
      results;

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
        elementCount: barrierElementCount[barrier],
        errorCount: barrierErrorCount[barrier],
      };

      specificResults.push(barrierData);

      if (barrierElementCount[barrier] != null) {
        barrierCount++;
        globalElementCount += barrierElementCount[barrier];
        globalErrorCount += barrierErrorCount[barrier];
      }
    }

    console.log(
      barrierVerificationSteps,
      barrierCount,
      barrierElementCount,
      barrierErrorCount,
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
  } else {
    return null;
  }
};

module.exports = evaluatePage;
