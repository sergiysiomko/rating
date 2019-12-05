const createError = require('http-errors');
const express = require('express');
const path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/rating_db', 
                {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
                },
                (err)=>{
                  if( err )console.log(err);
                  console.log('mongoose: OK');
                })
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret:'secretstring',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave:false, 
  saveUninitialized:false,
  cookie: { maxAge: 1000*60*60*20*14 }// 2 weeks
}));

// passport configuration
app.use(passport.initialize())
app.use(passport.session()) 

require('./modules/authentication')(passport)

app.use('/', indexRouter);
require('./routes/users')(app, passport)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
