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

exports.proposalMetas = function(parsedProposal, query) {
  const proposal = parsedProposal.results[0];
  const isOperation = proposal.operationId !== undefined && proposal.operationId !== '';
  const fetchContext = (isOperation) ?
    operationsController.operationById(proposal.operationId) : configurationController.config();

  return fetchContext.then((parsedContextResponse) => {
    const contextName = (function() {
      if (isOperation) {
        const translation = parsedContextResponse
          .translations.find(translation => translation.language === proposal.language);
        if (translation) { return translation.title; }
        throw `Translation ${proposal.language} not found for operation ${parsedContextResponse.operationId}`;
      }

      const theme = parsedContextResponse.themes
        .find(theme => theme.themeId === proposal.themeId);
      if (!theme) { throw `Theme ${proposal.themeId} not found.`; }
      const translation = theme
        .translations.find(translation => translation.language === proposal.language);

      if (translation) { return translation.title; }
      throw `Translation ${proposal.language} not found for theme ${theme.themeId}`;
    }());
    return (function() {
      switch (query.shared_proposal) {
        case 'my-proposal':
          return metas.myProposal(contextName, proposal.content);
        case 'voted-proposal':
          return metas.proposal(contextName, proposal.author.firstName ||
            proposal.author.organizationName, proposal.content);
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
