const request = require('request-promise');

const getPage = async (url) => {
  if (!url) {
    return null;
  }
  const document = await request(url).catch((e) => {
    return null;
  });
  return document;
};

module.exports = getPage;
