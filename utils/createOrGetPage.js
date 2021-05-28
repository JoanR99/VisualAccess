const Page = require('../models/pageModel');

const createOrGetPage = async (url) => {
  const page = await Page.findOne({ url }, (err, page) => {
    if (err) console.log(err);
    if (page) {
      return page;
    } else {
      console.log('no se encontro la pagina');
    }
  }).populate({
    path: 'reviews',
    populate: {
      path: 'author',
    },
  });

  if (page) {
    return page;
  } else {
    const newPage = new Page({ url });
    await newPage.save();
    return newPage;
  }
};

module.exports = createOrGetPage;
