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

const defaultMetas = {
  title: "Make.org, accélérateur d'intérêt général",
  description: 'Proposez, votez, agissons : ensemble, trouvons des solutions aux grandes problématiques actuelles. Les plus soutenues seront mises en action par Make.org et ses partenaires.',
  picture: 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5b86a9ba93851e6ea8e800b4_default%20meta%20card%20il%20faut.png',
};

const sequenceMetas = {
  ...defaultMetas,
  description: 'Vous avez un avis sur le sujet ? Alors comme des milliers de citoyens participez à la consultation nationale Make.org : proposez vos idées, réagissez à celles des autres ! Les meilleures seront transformées en actions.',
};

function myProposal(contextName, proposalContent) {
  return {
    ...defaultMetas,
    title: 'Soutenez ma proposition sur Make.org',
    description: `Sur le sujet ${contextName} je propose «${proposalContent}».`,
  };
}

function proposal(contextName, authorName, proposalContent) {
  return {
    ...defaultMetas,
    title: 'Comme moi, soutenez cette proposition sur Make.org',
    description: `Sur le sujet ${contextName}, ${authorName} propose «${proposalContent}».\n` +
                 'Comme moi, soutenez la ou réagissez en votant sur Make.org !',
  };
}

function getOperationImage(operationSlug) {
  switch (operationSlug) {
    case 'chance-aux-jeunes':
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5b83cb20b775a97cfb67f5a4_meta%20jeunes.jpg';
    case 'mieux-vivre-ensemble':
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5b83cb202b7a399c42b56d3d_meta%20mve.jpg';
    case 'culture':
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5b83cb2046483e731b5f21fe_meta%20culture.jpg';
    case 'aines':
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5ba39fc6fafb147685dd9b4c_meta%20aines.jpg';
    default:
      return defaultMetas.picture;
  }
}

function getOperationDescription(operationSlug) {
  switch (operationSlug) {
    case 'culture':
      return 'Vous avez un avis sur le sujet ? Alors comme des milliers de citoyens participez à la consultation ' +
             'nationale Make.org : proposez vos idées, réagissez à celles des autres ! Les meilleures seront transformées en actions';
    case 'aines':
      return 'Make.org lance avec le ministère des Solidarités et de la Santé une vaste consultation citoyenne en ligne autour de la question :' +
      '\'Comment mieux prendre soin de nos aînés ?\'. Les milliers de propositions citoyennes recueillies vont nous permettre de bâtir le 1er ' +
      'grand Plan d\'actions citoyen en faveur des Aînés.';
    default:
      return sequenceMetas.description;
  }
}

function sequence(operationName, operationSlug) {
  return {
    ...sequenceMetas,
    description: getOperationDescription(operationSlug),
    title: operationName,
    picture: getOperationImage(operationSlug),
  };
}

module.exports = {
  default: defaultMetas,
  myProposal,
  proposal,
  sequence,
};
