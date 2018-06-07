var request = require('request-promise');
var conf = require("../helpers/configuration.js");

const apiUrl = conf.apiUrl;

exports.config = function() {
  return request(`${apiUrl}/configurations/front`)
  .then(function(response){
    return JSON.parse(response);
  });
}

