var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
};

module.exports = function(passport){

  /* GET login page. */
  /*
   router.get('/', function(req, res) {
   // Display the Login page with any flash message, if any
   res.render('index', { message: req.flash('message') });
   });
   */

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* GET Home Page */
  router.get('/home', isAuthenticated, function(req, res){
    res.render('home', { user: req.user });
  });

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // route for facebook authentication and login
  // different scopes while logging in
  router.get('/login/facebook',
    passport.authenticate('facebook', { session: false, scope : 'email' }
    ));

  // handle the callback after facebook has authenticated the user
  router.get('/callbacklogin/facebook',
    passport.authenticate('facebook', { session: false, failureRedirect: "/contact" }),
    function(req, res) {
      console.log('route: req.user: ', typeof req.user, req.user);
      var {fb: {access_token}} = req.user;
      console.log('token: ', access_token);
      res.redirect('http://localhost:3000/profile?access_token=' + access_token);
    }
  );

  return router;
};

