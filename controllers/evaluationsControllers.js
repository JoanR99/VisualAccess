const Evaluation = require('../models/evaluationModel');
const Page = require('../models/pageModel');
const Result = require('../models/resultModel');
const evaluatePage = require('../helpers/evaluatePage');
const barrierData = require('../helpers/barrierData');
const formatDate = require('../helpers/formatDate');
const defineAccessibilityLevel = require('../helpers/defineAccessibilityLevel');

module.exports.renderNewForm = (req, res) => {
  res.render('evaluations/newEvaluation');
};

module.exports.createEvaluation = async (req, res, next) => {
  const { url, disabilityProfile } = req.body;
  const results = await evaluatePage(url, disabilityProfile);
  let profile;
  if (disabilityProfile == 'totalBlind') {
    profile = 'Evaluación para ceguera total';
  } else {
    profile = 'Evaluación para ceguera parcial';
  }
  let today = new Date();
  let evaluationDate = formatDate(today);
  let accessibilityLevel = defineAccessibilityLevel(results.globalScore);
  results.accessibilityLevel = accessibilityLevel;
  // const result = new Result(results);
  // await result.save();
  // const evaluation = new Evaluation();
  // evaluation.result = result._id;
  // evaluation.disabilityProfile = disabilityProfile;

  // const page = await Page.findOne({ url }, (err, page) => {
  //   if (err) console.log(err);
  //   if (page) {
  //     return page;
  //   } else {
  //     console.log('no se encontro la pagina');
  //   }
  // });

  // if (page) {
  //   evaluation.page = page._id;
  // } else {
  //   const newPage = new Page({ url });
  //   await newPage.save();
  //   evaluation.page = newPage._id;
  // }

  // await evaluation.save();
  // res.redirect(`/evaluations/${evaluation._id}`);
  res.render('evaluations/showEvaluation', {
    evaluation: {
      result: results,
      page: { url },
      profile,
      evaluationDate,
    },
    barrierData,
    currentUser: false,
  });
};

module.exports.showEvaluation = async (req, res) => {
  const { id } = req.params;
  const evaluation = await Evaluation.findById(id)
    .populate('result')
    .populate('page');

  if (!evaluation) {
    return res.redirect('/evaluations/new');
  }
  console.log(evaluation);
  res.render('evaluations/showEvaluation', { evaluation, barrierData });
};
