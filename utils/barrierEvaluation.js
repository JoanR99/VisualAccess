const _ = require('lodash');

const barierrEvaluation = (barrierVerificationSteps) => {
  let barrierScores = {};
  for (const barrier in barrierVerificationSteps) {
    if (barrierVerificationSteps[barrier] === null) {
      barrierScores[barrier] = null;
    } else if (barrierVerificationSteps[barrier] === 0) {
      barrierScores[barrier] = 0;
    } else {
      let c = barrierVerificationSteps[barrier].length;
      let p = barrierVerificationSteps[barrier][0].length - 1;
      let ep = [];
      for (let j = 0; j < barrierVerificationSteps[barrier].length; j++) {
        ep.push(_.drop(barrierVerificationSteps[barrier][j]));
      }
      let elementsScoresSum = 0;
      for (let i = 0; i < ep.length; i++) {
        let verificationStepsSum = 0;
        verificationStepsSum = ep[i].reduce((a, valor) => (a += valor));
        elementsScoresSum += verificationStepsSum / p;
      }

      let equationResult = elementsScoresSum / c;

      if (equationResult % 1 == 0) {
        barrierScores[barrier] = equationResult;
      } else {
        barrierScores[barrier] = Number.parseFloat(equationResult.toFixed(2));
      }
    }
  }
  return barrierScores;
};

module.exports = barierrEvaluation;
