/*
 *
 * Make.org Front Runner
 * Copyright (C) 2018 Make.org
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const conf = require('../helpers/configuration.js');
const metasHelper = require('../helpers/metas.js');
const proposalsController = require('../controllers/proposals.js');
const operationsController = require('../controllers/operations.js');

const router = express.Router();

const apiUrl = conf.apiUrl;

const defaultMetas = metasHelper.default;

function loadContent(country, metas) {
  // @todo: add cache system
  const data = fs.readFileSync(path.join(`${__dirname}/../front/index.html`), 'utf8');

  const content = data
    .replace(/API_URL/g, apiUrl)
    .replace(/FORCED_COUNTRY/g, country)
    .replace(/DETECTED_COUNTRY/g, country)
    .replace(/META_TITLE/g, metas.title)
    .replace(/META_DESCRIPTION/g, metas.description)
    .replace(/META_PICTURE/g, metas.picture);

  return content;
}

router.get('/:country', (req, res) => {
  const country = req.params.country;

  res.send(loadContent(country, defaultMetas));
});

// sequence from operation
router.get('/:country/consultation/:operationSlug/selection', (req, res) => {
  const country = req.params.country;

  operationsController.operationBySlug(req.params.operationSlug)
    .then((parsedResponse) => {
      res.send(loadContent(country, operationsController.operationMetas(parsedResponse)));
    })
    .catch((err) => {
      console.error(err);
      res.send(loadContent(country, defaultMetas));
    });
});

// Proposal from theme
router.get('/:country/theme/:themeSlug/proposal/:proposalSlug', (req, res) => {
  const country = req.params.country;

  proposalsController.proposalBySlug(req.params.proposalSlug)
    .then((parsedResponse) => {
      const metas = parsedResponse.total > 0
        ? {
          ...defaultMetas,
          description: parsedResponse.results[0].content,
        } : defaultMetas;

      res.send(loadContent(country, metas));
    })
    .catch((err) => {
      console.error(err);
      res.send(loadContent(country, defaultMetas));
    });
});

// Proposal from operation
router.get('/:country/consultation/:operationSlug/proposal/:proposalSlug', (req, res) => {
  const country = req.params.country;

  proposalsController.proposalBySlug(req.params.proposalSlug)
    .then((parsedResponse) => {
      const metas = parsedResponse.total > 0
        ? {
          ...defaultMetas,
          description: parsedResponse.results[0].content,
        } : defaultMetas;

      res.send(loadContent(country, metas));
    })
    .catch((err) => {
      console.error(err);
      res.send(loadContent(country, defaultMetas));
    });
});

// Proposal from no where
router.get('/:country/proposal/:proposalSlug', (req, res) => {
  const country = req.params.country;

  proposalsController.proposalBySlug(req.params.proposalSlug)
    .then(parsedProposalResponse =>
      proposalsController.proposalMetas(parsedProposalResponse, req.query))
    .then((localMetas) => {
      res.send(loadContent(country, localMetas));
    })
    .catch((err) => {
      console.error(`falling back to default metas : ${err}`);
      res.send(loadContent(country, defaultMetas));
    });
});

// Proposal from no where
router.get('/:operationSlug/:organisationSlug', (req, res) => {
  const operationSlug = req.params.operationSlug;
  const organisationSlug = req.params.organisationSlug;

  const url = ['/consultation/', operationSlug, '/selection?utm_source=', organisationSlug, '&utm_campaign=', operationSlug, '&utm_medium=offline'];
  res.redirect(url.join(''));
});

module.exports = router;
