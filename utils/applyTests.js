const cheerio = require('cheerio');
const test = require('./tests');

const applyTests = async (document) => {
  if (document) {
    const $ = cheerio.load(document);

    const barrierData = {
      H25: await test.H25($),
      H32: await test.H32($),
      H35: await test.H35($),
      H36: await test.H36($),
      H37: await test.H37($),
      H44: await test.H44($),
      H46: await test.H46($),
      H57: await test.H57($),
      H63: await test.H63($),
      H64: await test.H64($),
      H93: await test.H93($),
      H96: await test.H96($),
    };

    let barrierVerificationSteps = {};
    let barrierElementCount = {};
    let barrierErrorCount = {};
    for (const barrier in barrierData) {
      barrierVerificationSteps[barrier] =
        barrierData[barrier].verificationSteps;
      barrierElementCount[barrier] = barrierData[barrier].elementCount;
      barrierErrorCount[barrier] = barrierData[barrier].errorCount;
    }

    return { barrierVerificationSteps, barrierElementCount, barrierErrorCount };
  } else {
    return null;
  }
};

module.exports = applyTests;
