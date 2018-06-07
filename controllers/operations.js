var request = require('request-promise');
var conf = require("../helpers/configuration.js");

const apiUrl = conf.apiUrl;

exports.operationById = function(operationId) {
  return request(`${apiUrl}/operations/${operationId}`)
  .then(function(response){
    return JSON.parse(response);
  });
}

