const Evaluation = require('../models/evaluationModel');
const Page = require('../models/pageModel');
const Result = require('../models/resultModel');
const evaluatePage = require('../utils/evaluatePage');
const barrierData = require('../utils/barrierData');
const formatDate = require('../utils/formatDate');
const defineAccessibilityLevel = require('../utils/defineAccessibilityLevel');
const createOrGetPage = require('../utils/createOrGetPage');

module.exports.renderNewForm = (req, res) => {
  res.render('evaluation/newEvaluation');
};

module.exports.createEvaluation = async (req, res, next) => {
  const { url, disabilityProfile } = req.body;
  const results = await evaluatePage(url, disabilityProfile);

  const page = await createOrGetPage(url);

  if (results) {
    if (!req.isAuthenticated()) {
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
      return res.render('evaluation/showEvaluation', {
        evaluation: {
          result: results,
          profile,
          evaluationDate,
        },
        page,
        barrierData,
        currentUser: false,
      });
    } else {
      const result = new Result(results);
      await result.save();
      const evaluation = new Evaluation();
      evaluation.result = result._id;
      evaluation.disabilityProfile = disabilityProfile;
      evaluation.author = req.user._id;
      evaluation.page = page._id;
      await evaluation.save();
      return res.redirect(`/evaluation/${evaluation._id}`);
    }
  } else {
    req.flash('error', 'Ha ocurrido un error al intentar evaluar la página.');
    return res.redirect('/evaluation/new');
  }
};

module.exports.deleteEvaluation = async (req, res) => {
  const { id } = req.params;
  await Evaluation.findByIdAndDelete(id);
  req.flash('success', '¡Evaluación eliminada satisfactoriamente!');
  res.redirect('/');
};

module.exports.showEvaluation = async (req, res) => {
  const { id } = req.params;
  const evaluation = await Evaluation.findById(id).populate('result');

  const page = await Page.findById(evaluation.page._id).populate({
    path: 'reviews',
    populate: {
      path: 'author',
    },
  });

  if (!evaluation) {
    req.flash('error', '¡No se pudo encontrar esa evaluación!');
    return res.redirect('/evaluation/new');
  }
  res.render('evaluation/showEvaluation', { evaluation, page, barrierData });
};

module.exports.showSpecificHistory = async (req, res) => {
  const { pageId } = req.params;
  const userId = req.user._id;
  const evaluations = await Evaluation.find({ page: pageId, author: userId })
    .populate('result')
    .populate('page')
    .sort({ date: -1 });
  if (!evaluations) {
    req.flash('error', '¡No se encontraron evaluaciones para esta página!');
    return res.redirect('/');
  }
  if (evaluations) {
    return res.render('evaluation/history', { evaluations });
  }
};

module.exports.showHistory = async (req, res) => {
  const userId = req.user._id;
  const evaluations = await Evaluation.find({ author: userId })
    .populate('result')
    .populate('page')
    .sort({ date: -1 });
  if (!evaluations) {
    req.flash('error', '¡No se encontraron evaluaciones para esta página!');
    return res.redirect('/');
  }
  if (evaluations) {
    return res.render('evaluation/history', { evaluations });
  }
};
