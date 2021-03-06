const express = require('express');
const router = express.Router();
const User = require ('../models/user');
const passport = require('passport');

router.get("/", (req, res) => {
    res.render("landing");
  });
  
  
  //-----------AUTH ROUTES --------------
  
  //show reg form
  router.get('/register', (req, res) => {
    res.render('register');
  });
  
  router.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) =>{
      if(err){
        //console.log(err);
        req.flash('error', err.message);
        return res.render('register');
      }
      passport.authenticate('local')(req, res, () =>{
        req.flash('success', 'Welcome to Truther\'s Camp ' + req.body.username);
        res.redirect('/campgrounds');
      });
    })
  });
  
  router.get('/login', (req, res) => {
    res.render('login');
  });
  
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }));
  
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye, see you next time :)');
     res.redirect('/campgrounds');
  });
  

  module.exports = router;