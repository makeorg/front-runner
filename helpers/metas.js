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
  picture: 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5b977480cd07ff475b914214_default%20meta%20card%20il%20faut.png',
};

const sequenceMetas = {
  ...defaultMetas,
  description: 'Vous avez un avis sur le sujet ? Alors comme des milliers de citoyens participez à la consultation nationale Make.org : proposez vos idées, réagissez à celles des autres ! Les meilleures seront transformées en actions.',
};

function getOperationImageForProposal(operationSlug) {
  switch (operationSlug) {
    case ('jeunesse-hautsdefrance'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5bd073e6ae57fd558cc90165_meta%20hdf.jpg';
    default:
      return defaultMetas.picture;
  }
}

function getOperationImageForSequence(operationSlug, country) {
  const concatenated = [country, operationSlug].join('-');
  switch (concatenated) {
    case ('FR-chance-aux-jeunes'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5b83cb20b775a97cfb67f5a4_meta%20jeunes.jpg';
    case ('FR-mieux-vivre-ensemble'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5b83cb202b7a399c42b56d3d_meta%20mve.jpg';
    case ('FR-culture'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5b83cb2046483e731b5f21fe_meta%20culture.jpg';
    case ('FR-aines'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5ba39fc6fafb147685dd9b4c_meta%20aines.jpg';
    case ('FR-plan-climat'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5bc700fec88c3a984341ad23_meta%20plan%20climat.jpg';
    case ('FR-european-digital-champions'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5bc88fc5e1f404acc8042ac1_meta%20g9%2B.jpg';
    case ('DE-european-digital-champions'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5bd6e1a25d02ac436404deca_meta%20g9%2B%20de.jpg';
    case ('FR-jeunesse-hautsdefrance'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5bd073e6ae57fd558cc90165_meta%20hdf.jpg';
    case ('FR-villededemain'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5bd18472f5c68034b6b5fcf3_meta%20mipim.jpg';
    case ('GB-villededemain'):
      return 'https://uploads-ssl.webflow.com/59833d390a24e50001b873d8/5bf686c60627e72ebbf942fe_meta%20mipim%20uk.jpg';
    default:
      return defaultMetas.picture;
  }
}

function getOperationDescriptionForSequence(operationSlug, country) {
  const concatenated = [country, operationSlug].join('-');
  switch (concatenated) {
    case ('FR-culture'):
      return 'Vous avez un avis sur le sujet ? Alors comme des milliers de citoyens participez à la consultation ' +
             'nationale Make.org : proposez vos idées, réagissez à celles des autres ! Les meilleures seront transformées en actions';
    case ('FR-aines'):
      return 'Make.org lance avec le ministère des Solidarités et de la Santé une vaste consultation citoyenne en ligne autour de la question :' +
      '\'Comment mieux prendre soin de nos aînés ?\'. Les milliers de propositions citoyennes recueillies vont nous permettre de bâtir le 1er ' +
      'grand Plan d\'actions citoyen en faveur des Aînés.';
    case ('FR-plan-climat'):
      return 'Vous avez une idée sur le sujet ? Alors comme des milliers de citoyens participez à la consultation Plan Climat de Make.org ' +
      'en partenariat avec Nice Matin et la Métropole Nice Côte d\'Azur';
    case ('FR-european-digital-champions'):
      return 'Vous avez une idée sur le sujet ? Participez à la consultation initiée par le G9+ & Roland Berger avec Make.org';
    case ('DE-european-digital-champions'):
      return 'Sie haben irgendwelche Ideen zu diesem Thema? Nehmen Sie an der von den G9+ & Roland Berger initiierten Konsultation mit Make.org teil.';
    case ('FR-jeunesse-hautsdefrance'):
      return 'Vous avez une idée sur le sujet ? Participez à la consultation initiée par la Région Hauts-de-France avec Make.org';
    case ('FR-villededemain'):
      return 'Vous avez une idée sur le sujet ? Participez à la consultation organisée à l\'occasion du MIPIM 2019';
    case ('GB-villededemain'):
      return 'Any thought on that topic ? Join the consultation started by MIPIM along with Make.org';
    default:
      return sequenceMetas.description;
  }
}

function myProposal(contextName, proposalContent, operationSlug) {
  return {
    ...defaultMetas,
    title: 'Soutenez ma proposition sur Make.org',
    description: `Sur le sujet ${contextName} je propose «${proposalContent}».`,
    picture: getOperationImageForProposal(operationSlug),
  };
}

function proposal(contextName, authorName, proposalContent, operationSlug) {
  return {
    ...defaultMetas,
    title: 'Comme moi, soutenez cette proposition sur Make.org',
    description: `Sur le sujet ${contextName}, ${authorName} propose «${proposalContent}».\n` +
                 'Comme moi, soutenez la ou réagissez en votant sur Make.org !',
    picture: getOperationImageForProposal(operationSlug),
  };
}

function sequence(operationName, operationSlug, country) {
  return {
    ...sequenceMetas,
    description: getOperationDescriptionForSequence(operationSlug, country),
    title: operationName,
    picture: getOperationImageForSequence(operationSlug, country),
  };
}

module.exports = {
  default: defaultMetas,
  myProposal,
  proposal,
  sequence,
};
