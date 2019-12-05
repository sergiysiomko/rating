// var express = require('express');
// var router = express.Router();
// const passport = require('passport');
module.exports = function(app, passport){

app.get('/users',isLoggedIn,(req, res) => {
  res.send(req.user)
})

app.get('/users/register', function(req, res, next) {
  res.render('register')
});
app.get('/users/login', function(req, res, next) {
  res.render('login')
});
app.post('/users/register', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/users/register', // redirect back to the signup page if there is an error
  //failureFlash : true // allow flash messages
}));

app.post('/users/login',passport.authenticate('local-login',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash: true
  }
));

app.get('/users/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


  // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/users/login');
}
}
