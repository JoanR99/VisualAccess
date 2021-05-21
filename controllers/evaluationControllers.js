const Evaluation = require('../models/evaluationModel');
const Page = require('../models/pageModel');
const Result = require('../models/resultModel');
const evaluatePage = require('../utils/evaluatePage');
const barrierData = require('../utils/barrierData');
const formatDate = require('../utils/formatDate');
const defineAccessibilityLevel = require('../utils/defineAccessibilityLevel');

module.exports.renderNewForm = (req, res) => {
  res.render('evaluation/newEvaluation');
};

module.exports.createEvaluation = async (req, res, next) => {
  const { url, disabilityProfile } = req.body;
  const results = await evaluatePage(url, disabilityProfile);
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
    req.flash('success', 'Se ha evaluado la página correctamente!');
    res.render('evaluation/showEvaluation', {
      evaluation: {
        result: results,
        page: { url },
        profile,
        evaluationDate,
      },
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

    const page = await Page.findOne({ url }, (err, page) => {
      if (err) console.log(err);
      if (page) {
        return page;
      } else {
        console.log('no se encontro la pagina');
      }
    });

    if (page) {
      evaluation.page = page._id;
    } else {
      const newPage = new Page({ url });
      await newPage.save();
      evaluation.page = newPage._id;
    }

    await evaluation.save();
    req.flash('success', 'Se ha evaluado la página correctamente!');
    res.redirect(`/evaluation/${evaluation._id}`);
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
  const evaluation = await Evaluation.findById(id)
    .populate('result')
    .populate('page');

  if (!evaluation) {
    req.flash('error', '¡No se pudo encontrar esa evaluación!');
    return res.redirect('/evaluation/new');
  }
  console.log(evaluation);
  res.render('evaluation/showEvaluation', { evaluation, barrierData });
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
    console.log(evaluations);
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
    console.log(evaluations);
    return res.render('evaluation/history', { evaluations });
  }
};
