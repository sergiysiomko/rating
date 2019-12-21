require('dotenv').config()
const express = require('express');
const path = require('path');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)

const routes = require('./modules/routes');

const dataManager = require('./modules/db/DataManager');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// session configuration
app.use(session({
  secret:process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: dataManager.getConnection() }),
  resave:false, 
  saveUninitialized:false,
  cookie: { maxAge: parseInt(process.env.COOKIE_MAX_AGE)}// 2 weeks
}));

// passport configuration
app.use(passport.initialize())
app.use(passport.session()) 



app.use('/', routes);



module.exports = app;
