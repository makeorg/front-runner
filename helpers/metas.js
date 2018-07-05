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
  picture: 'https://uploads-ssl.webflow.com/598345cdee443e00013ae603/59a526e0a1a95c0001f8ca11_make.png',
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
    description: `Sur le sujet ${contextName}, ${authorName} propose «${proposalContent}».\nComme moi, soutenez la ou réagissez en votant sur Make.org !`,
  };
}

function getOperationImage(operationSlug) {
  switch (operationSlug) {
    case 'chance-aux-jeunes':
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5ac49addb50fc94d36e63221_share%20image%20une%20chance%20pour%20chaque%20jeune.jpg';
    case 'mieux-vivre-ensemble':
      return 'https://uploads-ssl.webflow.com/598345cdee443e00013ae603/5aaa3e43106bcfc5bc0979cc_simulation%20visuel%20fb.jpg';
    case 'culture':
      return 'https://uploads-ssl.webflow.com/5ad76c5556a6411ac66ff8b3/5b23dad56f08f70e31e8a787_une.png';
    default:
      return defaultMetas.picture;
  }
}

function sequence(operationName, operationSlug) {
  return {
    ...sequenceMetas,
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
