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

const request = require('request-promise');
const conf = require('../helpers/configuration.js');
const metas = require('../helpers/metas.js');
const operationsController = require('./operations.js');
const configurationController = require('./configuration.js');

const apiUrl = conf.apiUrl;

exports.proposalBySlug = function(slug) {
  return request(`${apiUrl}/proposals?slug=${slug}`)
    .then(response => JSON.parse(response));
};

exports.proposalById = function(proposalId) {
  return request(`${apiUrl}/proposals/${proposalId}`)
    .then(response => JSON.parse(response));
};

exports.proposalMetas = function(parsedProposal, query) {
  const proposal = parsedProposal;
  const isOperation = proposal.operationId !== undefined && proposal.operationId !== '';
  const fetchContext = (isOperation) ?
    operationsController.operationById(proposal.operationId) : configurationController.config();

  return fetchContext.then((parsedContextResponse) => {
    const contextName = (function() {
      if (isOperation) {
        const translation = parsedContextResponse
          .translations
          .find(responseTranslation => responseTranslation.language === proposal.language);
        if (translation) { return translation.title; }
        throw `Translation ${proposal.language} not found for operation ${parsedContextResponse.operationId}`;
      }

      const theme = parsedContextResponse.themes
        .find(responseTheme => responseTheme.themeId === proposal.themeId);
      if (!theme) { throw `Theme ${proposal.themeId} not found.`; }
      const translation = theme
        .translations.find(themeTranslation => themeTranslation.language === proposal.language);

      if (translation) { return translation.title; }
      throw `Translation ${proposal.language} not found for theme ${theme.themeId}`;
    }());
    const operationSlug = (isOperation) ? parsedContextResponse.slug : undefined;
    const authorName = proposal.author.firstName || proposal.author.organizationName;
    return (function() {
      switch (query.shared_proposal) {
        case 'my-proposal':
          return metas.myProposal(contextName, proposal.content, operationSlug);
        case 'voted-proposal':
          return metas.proposal(contextName, authorName, proposal.content, operationSlug);
        default:
          return metas.default;
      }
    }());
  })
    .catch((err) => {
      console.error(`Error while providing metas from proposal context: ${err}`);
      return metas.default;
    });
};
