const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/',passport.isLoggedIn,(req, res) => {
  res.send(req.user)
})

router.get('/register', function(req, res, next) {
  res.render('register')
});
router.get('/login', function(req, res, next) {
  res.render('login')
});
router.post('/register', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/register', // redirect back to the signup page if there is an error
  //failureFlash : true // allow flash messages
}));

router.post('/login',passport.authenticate('local-login',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash: true
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});




module.exports = router;

