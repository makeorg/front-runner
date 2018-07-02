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

const apiUrl = conf.apiUrl;

exports.operationById = function(operationId) {
  return request(`${apiUrl}/operations/${operationId}`)
    .then(response => JSON.parse(response));
};

exports.operationBySlug = function(slug) {
  return request.get(`${apiUrl}/operations?slug=${slug}`)
    .then(response => JSON.parse(response));
};

exports.operationMetas = function(parsedResponse, query) {
  const language = query.language;
  const operationSlug = parsedResponse[0].slug;
  const operationName = parsedResponse[0].translations
    .find(translation => translation.language === language).title;
  return metas.sequence(operationName, operationSlug);
};
