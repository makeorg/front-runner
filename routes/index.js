var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res, next) {
  console.log(req.params);
  res.render('index', {
    title: 'Make.org, accélérateur d\'intérêt collectif'
  });
});

// Proposal from theme
router.get('/theme/:themeSlug/proposal/:proposalSlug', function(req, res, next) {
  var title = '';
  console.log(`${req.param('proposalSlug')}`, req.param('proposalSlug'));

  request(`https://api.preprod.makeorg.tech/proposals?slug=${req.param('proposalSlug')}`, function(error, response, body) {
    var parsedBody = JSON.parse(body);
    if (parsedBody.total > 0) {
      title = parsedBody.results[0].content

      res.render('index', {
        title: title
      });
    }
  });

});

// Proposal from operation
router.get('/consultation/:operationSlug/proposal/:proposalSlug', function(req, res, next) {
  console.log(req.params);
  res.render('index', {
    title: 'Il faut élire le premier ministre et tous les ministres au suffrage universel direct From operation'
  });
});

// Proposal from no where
router.get('/proposal/:proposalSlug', function(req, res, next) {
  console.log(req.params);
  res.render('index', {
    title: 'Il faut élire le premier ministre et tous les ministres au suffrage universel direct'
  });
});

module.exports = router;
