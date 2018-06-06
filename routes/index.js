var express = require('express');
var router = express.Router();
var request = require('request-promise');
var fs = require('fs');
var path = require("path");

const apiUrl = process.env.API_URL || 'https://api.preprod.makeorg.tech';

const defaultMetas = {
  title: "Make.org, accélérateur d'intérêt collectif",
  description: "Proposez, votez, agissons : ensemble, trouvons des solutions aux grandes problématiques actuelles. Les plus soutenues seront mises en action par Make.org et ses partenaires.",
  picture: "https://uploads-ssl.webflow.com/598345cdee443e00013ae603/59a526e0a1a95c0001f8ca11_make.png"
};


router.get('/:country', function(req, res, next) {
  const country = req.param('country');

  res.send(loadContent(country, defaultMetas));
});

// Proposal from theme
router.get('/:country/theme/:themeSlug/proposal/:proposalSlug', function(req, res, next) {
  const country = req.param('country');

  request(`${apiUrl}/proposals?slug=${req.param('proposalSlug')}`)
    .then(function(response){
      return JSON.parse(response);
    })
    .then(function(parsedResopnse) {
      let metas = parsedResopnse.total > 0
          ? {
            ...defaultMetas,
            description: parsedResopnse.results[0].content,
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

  request(`${apiUrl}/proposals?slug=${req.param('proposalSlug')}`)
    .then(function(response){
      return JSON.parse(response);
    })
    .then(function(parsedResopnse) {
      let metas = parsedResopnse.total > 0
          ? {
            ...defaultMetas,
            description: parsedResopnse.results[0].content,
          } : defaultMetas;

      res.send(loadContent(country, metas));

    })
    .catch(function (err) {
      res.send(loadContent(country, defaultMetas));
    });
});

// Proposal from no where
router.get('/:country/proposal/:proposalSlug', function(req, res, next) {
  const country = req.param('country');

  request(`${apiUrl}/proposals?slug=${req.param('proposalSlug')}`)
    .then(function(response){
      return JSON.parse(response);
    })
    .then(function(parsedResopnse) {
      let metas = parsedResopnse.total > 0
          ? {
            ...defaultMetas,
            description: parsedResopnse.results[0].content,
          } : defaultMetas;

      res.send(loadContent(country, metas));

    })
    .catch(function (err) {
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
