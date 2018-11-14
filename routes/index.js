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
const configuration = require('../helpers/configuration.js');
const metasHelper = require('../helpers/metas.js');
const proposalsController = require('../controllers/proposals.js');
const operationsController = require('../controllers/operations.js');

const router = express.Router();

const apiUrl = configuration.apiUrl;

const defaultMetas = metasHelper.default;

function loadContent(request, metas) {
  // @todo: add cache system
  const data = fs.readFileSync(path.join(`${__dirname}/../front/index.html`), 'utf8');

  const content = data
    .replace(/API_URL/g, apiUrl)
    .replace(/FORCED_COUNTRY/g, request.headers['x-forced-country'] || 'FR')
    .replace(/DETECTED_COUNTRY/g, request.headers['x-detected-country'] || 'FR')
    .replace(/META_TITLE/g, metas.title)
    .replace(/META_DESCRIPTION/g, metas.description)
    .replace(/META_PICTURE/g, metas.picture);

  return content;
}

// Main page
router.get('/', (req, res) => {
  res.send(loadContent(req, defaultMetas));
});

router.get('/FR', (req, res) => {
  res.send(loadContent(req, defaultMetas));
});

router.get('/DE', (req, res) => {
  res.send(loadContent(req, defaultMetas));
});

router.get('/GB', (req, res) => {
  res.send(loadContent(req, defaultMetas));
});

// sequence from operation
router.get('/:country/consultation/:operationSlug/selection', (req, res) => {
  const country = req.params.country;
  operationsController.operationBySlug(req.params.operationSlug)
    .then((parsedResponse) => {
      res.send(loadContent(req, operationsController.operationMetas(parsedResponse, country)));
    })
    .catch((err) => {
      console.error(err);
      res.send(loadContent(req, defaultMetas));
    });
});

// Proposal from theme
router.get('/:country/theme/:themeSlug/proposal/:proposalId/:proposalSlug', (req, res) => {
  proposalsController.proposalById(req.params.proposalId)
    .then((parsedResponse) => {
      const metas = {
        ...defaultMetas,
        description: parsedResponse.content,
      };

      res.send(loadContent(req, metas));
    })
    .catch((err) => {
      console.error(err);
      res.send(loadContent(req, defaultMetas));
    });
});

router.get('/:country/theme/:themeSlug/proposal/:proposalSlug', (req, res) => {
  proposalsController.proposalBySlug(req.params.proposalSlug)
    .then((parsedResponse) => {
      const metas = parsedResponse.total > 0
        ? {
          ...defaultMetas,
          description: parsedResponse.results[0].content,
        } : defaultMetas;

      res.send(loadContent(req, metas));
    })
    .catch((err) => {
      console.error(err);
      res.send(loadContent(req, defaultMetas));
    });
});

// Proposal from operation
router.get('/:country/consultation/:operationSlug/proposal/:proposalId/:proposalSlug', (req, res) => {
  proposalsController.proposalById(req.params.proposalId)
    .then((parsedResponse) => {
      const metas = {
        ...defaultMetas,
        description: parsedResponse.content,
      };

      res.send(loadContent(req, metas));
    })
    .catch((err) => {
      console.error(err);
      res.send(loadContent(req, defaultMetas));
    });
});

router.get('/:country/consultation/:operationSlug/proposal/:proposalSlug', (req, res) => {
  proposalsController.proposalBySlug(req.params.proposalSlug)
    .then((parsedResponse) => {
      const metas = parsedResponse.total > 0
        ? {
          ...defaultMetas,
          description: parsedResponse.results[0].content,
        } : defaultMetas;

      res.send(loadContent(req, metas));
    })
    .catch((err) => {
      console.error(err);
      res.send(loadContent(req, defaultMetas));
    });
});

// Proposal from no where
router.get('/:country/proposal/:proposalId/:proposalSlug', (req, res) => {
  proposalsController.proposalById(req.params.proposalId)
    .then(parsedProposalResponse =>
      proposalsController.proposalMetas(parsedProposalResponse, req.query))
    .then((localMetas) => {
      res.send(loadContent(req, localMetas));
    })
    .catch((err) => {
      console.error(`falling back to default metas : ${err}`);
      res.send(loadContent(req, defaultMetas));
    });
});

router.get('/:country/proposal/:proposalSlug', (req, res) => {
  proposalsController.proposalBySlug(req.params.proposalSlug)
    .then(parsedProposalResponse =>
      proposalsController.proposalMetas(parsedProposalResponse.resluts[0], req.query))
    .then((localMetas) => {
      res.send(loadContent(req, localMetas));
    })
    .catch((err) => {
      console.error(`falling back to default metas : ${err}`);
      res.send(loadContent(req, defaultMetas));
    });
});

// Proposal from no where
router.get('/:operationSlug/:organisationSlug', (req, res) => {
  const operationSlug = req.params.operationSlug;
  const organisationSlug = req.params.organisationSlug;

  const url = ['/?utm_source=', organisationSlug, '&utm_campaign=', operationSlug, '&utm_medium=offline', '#/consultation/', operationSlug, '/selection'];
  res.redirect(url.join(''));
});

// operation shortcut
router.get('/:operationSlug', (req, res) => {
  const operationSlug = req.params.operationSlug;
  const url = ['/', '#/consultation/', operationSlug];
  res.redirect(url.join(''));
});

module.exports = router;
