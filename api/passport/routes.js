var express = require('express');
var router = express.Router();
import httpProxy from 'http-proxy';
var apiProxy = new httpProxy.createProxyServer();

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
      // var token = req.user.displayName;
      console.log('token: ', access_token);
      // apiProxy.web(req, res, { target: 'http://localhost:3000' });
      // res.json({ user: req.user});
      res.redirect('http://localhost:3000/profile2?access_token=' + access_token);
    }
  );

  return router;
};

