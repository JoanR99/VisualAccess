const cheerio = require('cheerio');
const test = require('./tests');

const scanPage = async (document) => {
  let $ = cheerio.load(document);
  let barrierData = {
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
    H95: await test.H95($),
    H96: await test.H96($),
  };

  let barrierVerificationSteps = {};
  let barrierElement = {};
  for (const barrier in barrierData) {
    barrierVerificationSteps[barrier] = barrierData[barrier].verificationSteps;
    barrierElement[barrier] = barrierData[barrier].element;
  }

  return { barrierVerificationSteps, barrierElement };
};

module.exports = scanPage;
