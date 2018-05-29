var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require("path");

var apiUrl = process.env.API_URL;
var frontUrl = process.env.FRONT_URL;

router.get('/:country', function(req, res, next) {
  var metas = {
    title: "Make.org, accélérateur d'intérêt collectif",
    description: "Proposez, votez, agissons : ensemble, trouvons des solutions aux grandes problématiques actuelles. Les plus soutenues seront mises en action par Make.org et ses partenaires.",
    picture: "https://uploads-ssl.webflow.com/598345cdee443e00013ae603/59a526e0a1a95c0001f8ca11_make.png"
  };

  res.send(loadContent(req.param('country'), metas));
});

// Proposal from theme
router.get('/:country/theme/:themeSlug/proposal/:proposalSlug', function(req, res, next) {

  request(`${process.env.API_URL}/proposals?slug=${req.param('proposalSlug')}`, function(error, response, body) {
    var parsedBody = JSON.parse(body);
    if (parsedBody.total > 0) {
      var metas = {
        title: "Make.org, accélérateur d'intérêt collectif",
        description: parsedBody.results[0].content,
        picture: "https://uploads-ssl.webflow.com/598345cdee443e00013ae603/59a526e0a1a95c0001f8ca11_make.png"
      };

      res.send(loadContent(req.param('country'), metas));
    }
  });
});

// Proposal from operation
router.get('/:country/consultation/:operationSlug/proposal/:proposalSlug', function(req, res, next) {
  request(`${process.env.API_URL}/proposals?slug=${req.param('proposalSlug')}`, function(error, response, body) {
    var parsedBody = JSON.parse(body);
    if (parsedBody.total > 0) {
      var metas = {
        title: "Make.org, accélérateur d'intérêt collectif",
        description: parsedBody.results[0].content,
        picture: "https://uploads-ssl.webflow.com/598345cdee443e00013ae603/59a526e0a1a95c0001f8ca11_make.png"
      };

      res.send(loadContent(req.param('country'), metas));
    }
  });
});

// Proposal from no where
router.get('/:country/proposal/:proposalSlug', function(req, res, next) {
  request(`${process.env.API_URL}/proposals?slug=${req.param('proposalSlug')}`, function(error, response, body) {
    var parsedBody = JSON.parse(body);
    if (parsedBody.total > 0) {
      var metas = {
        title: "Make.org, accélérateur d'intérêt collectif",
        description: parsedBody.results[0].content,
        picture: "https://uploads-ssl.webflow.com/598345cdee443e00013ae603/59a526e0a1a95c0001f8ca11_make.png"
      };

      res.send(loadContent(req.param('country'), metas));
    }
  });
});

function loadContent(country, metas) {
  var data = fs.readFileSync(path.join(__dirname + '/../front/index.html'), 'utf8');

  var content = data
    .replace(/API_URL/g, process.env.API_URL)
    .replace(/FORCED_COUNTRY/g, country)
    .replace(/DETECTED_COUNTRY/g, country)
    .replace(/META_TITLE/g, metas.title)
    .replace(/META_DESCRIPTION/g, metas.description)
    .replace(/META_PICTURE/g, metas.picture);

  return content;
}
module.exports = router;
