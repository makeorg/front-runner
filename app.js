const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const promBundle = require('express-prom-bundle');
const indexRouter = require('./routes/index');
const querystring = require('querystring');
const fs = require('fs');

const app = express();

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

app.use('/$', (req, res) => {
  const queryString = querystring.stringify(req.query);
  const url = `FR${queryString.length === 0 ? '' : `?${queryString}`}`;
  res.redirect(url);
});

app.use(express.static(path.join(__dirname, 'front')));
app.use('/', indexRouter);

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
