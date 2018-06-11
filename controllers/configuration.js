const request = require('request-promise');
const conf = require('../helpers/configuration.js');

const apiUrl = conf.apiUrl;

exports.config = function() {
  return request(`${apiUrl}/configurations/front`)
    .then(response => JSON.parse(response));
};

