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

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const promBundle = require('express-prom-bundle');
const indexRouter = require('./routes/index');
const fs = require('fs');
const compression = require('compression');
const proxy = require('./helpers/proxy.js');

const app = express();
app.use(compression());
app.use('/api', proxy);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(promBundle({ includeMethod: true }));

app.use('/version', (req, res) => {
  const data = fs.readFileSync(path.join(`${__dirname}/front/version`), 'utf8');
  res.header('Content-Type', 'application/json');
  res.json(JSON.parse(data));
});

app.use(express.static(path.join(__dirname, 'front'), { index: false }));
app.use('/', indexRouter);

// catch 404 and forward to home page
app.use((req, res) => {
  res.redirect(`/#${req.originalUrl}`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
