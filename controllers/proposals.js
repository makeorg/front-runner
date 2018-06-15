var request = require('request-promise');
var conf = require("../helpers/configuration.js");
var metas = require("../helpers/metas.js");
var operationsController = require("./operations.js");
var configurationController = require("./configuration.js");

const apiUrl = conf.apiUrl;

exports.proposalBySlug = function(slug) {
  return request(`${apiUrl}/proposals?slug=${slug}`)
  .then(function(response){
    return JSON.parse(response);
  });
}

exports.proposalMetas = function(parsedProposal, query) {
	const proposal = parsedProposal.results[0];
	const isOperation = proposal.operationId != undefined && proposal.operationId != "";
	const fetchContext = (isOperation) ? operationsController.operationById(proposal.operationId) : configurationController.config();

	return fetchContext.then(function(parsedContextResponse) {
    const contextName = (function() {
      if (isOperation) {
        const translation = parsedContextResponse.translations.find(function(translation) {
          return translation.language == proposal.language;
        })
        if (translation)
          return translation.title;
        throw `Translation ${proposal.language} not found for operation ${parsedContextResponse.operationId}`;
      }

      const theme = parsedContextResponse.themes.find(function(theme) {
        return theme.themeId == proposal.themeId;
      })
      if (!theme)
        throw `Theme ${proposal.themeId} not found.`;
      const translation = theme
      .translations.find(function(translation) {
        return translation.language == proposal.language;
      });

      if (translation)
        return translation.title
      throw `Translation ${proposal.language} not found for theme ${theme.themeId}`;
    })();
    return (function() {
      switch(query.shared_proposal) {
        case "my-proposal":
          return metas.myProposal(contextName, proposal.content);
          break;
        case "voted-proposal":
          return metas.proposal(contextName, proposal.author.firstName || proposal.author.organizationName, proposal.content);
          break;
        default:
          return metas.default;
      };
    })();
  })
  .catch(function (err) {
    console.log("Error while providing metas from proposal context: " + err);
    return metas.default;
  });

}
