const request = require('request-promise');
const conf = require('../helpers/configuration.js');
const metas = require('../helpers/metas.js');

const apiUrl = conf.apiUrl;

exports.operationById = function(operationId) {
  return request(`${apiUrl}/operations/${operationId}`)
    .then(response => JSON.parse(response));
};

exports.operationBySlug = function(slug) {
  return request.get(`${apiUrl}/operations?slug=${slug}`)
    .then(response => JSON.parse(response));
};

exports.operationMetas = function(parsedResponse, query) {
  const language = query.language;
  const operationSlug = parsedResponse[0].slug;
  const operationName = parsedResponse[0].translations
    .find(translation => translation.language === language).title;
  return metas.sequence(operationName, operationSlug);
};
