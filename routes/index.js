var express = require('express');
var router = express.Router();
var request = require('request-promise');
var fs = require('fs');
var path = require("path");
var conf = require("../helpers/configuration.js")
var metasHelper = require("../helpers/metas.js")
var proposalsController = require("../controllers/proposals.js")

const apiUrl = conf.apiUrl;

const defaultMetas = metasHelper.default;


router.get('/:country', function(req, res, next) {
  const country = req.param('country');

  res.send(loadContent(country, defaultMetas));
});

// Proposal from theme
router.get('/:country/theme/:themeSlug/proposal/:proposalSlug', function(req, res, next) {
  const country = req.param('country');

  proposalsController.proposalBySlug(req.param('proposalSlug'))
    .then(function(parsedResponse) {
      let metas = parsedResponse.total > 0
          ? {
            ...defaultMetas,
            description: parsedResponse.results[0].content,
          } : defaultMetas;

      res.send(loadContent(country, metas));

    })
    .catch(function (err) {
      res.send(loadContent(country, defaultMetas));
    });
});

// Proposal from operation
router.get('/:country/consultation/:operationSlug/proposal/:proposalSlug', function(req, res, next) {
  const country = req.param('country');

  proposalsController.proposalBySlug(req.param('proposalSlug'))
    .then(function(parsedResponse) {
      let metas = parsedResponse.total > 0
          ? {
            ...defaultMetas,
            description: parsedResponse.results[0].content,
          } : defaultMetas;

      res.send(loadContent(country, metas));

    })
    .catch(function (err) {
      res.send(loadContent(country, defaultMetas));
    });
});

// Proposal from no where
router.get('/:country/proposal/:proposalSlug', function(req, res, next) {
  const country = req.params.country;

  proposalsController.proposalBySlug(req.param('proposalSlug'))
    .then(function(parsedProposalResponse) {
      return proposalsController.proposalMetas(parsedProposalResponse, req.query);
    })
      .then(function(localMetas) {
        res.send(loadContent(country, localMetas));
      })
    .catch(function (err) {
      console.log("falling back to default metas : " + err);
      res.send(loadContent(country, defaultMetas));
    });
});

function loadContent(country, metas) {
  // @todo: add cache system
  const data = fs.readFileSync(path.join(__dirname + '/../front/index.html'), 'utf8');

  const content = data
    .replace(/API_URL/g, apiUrl)
    .replace(/FORCED_COUNTRY/g, country)
    .replace(/DETECTED_COUNTRY/g, country)
    .replace(/META_TITLE/g, metas.title)
    .replace(/META_DESCRIPTION/g, metas.description)
    .replace(/META_PICTURE/g, metas.picture);

  return content;
}

module.exports = router;
