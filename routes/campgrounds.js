const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware'); //index.js doesnt have to be explicitly referenced, its specially got


router.get("/",  (req, res) => {
    // res.render('campgrounds', { campgrounds: campgrounds });
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
      if (err) {
        console.log(err, "MATHATA!!!!!");
      } else {
        console.log(req.user);
        res.render("campgrounds/index", {
          campgrounds: campgrounds,
          currentUser: req.user
        });
      }
    });
  });
  
  router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
  });
  
  router.post("/", middleware.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let image = `/images/${req.body.image}`; //post ending /images folder to the incoming image name
    let desc = req.body.desc;
    let price = req.body.price;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
  
    let newCampground = {
      name: name,
      image: image,
      price: price,
      description: desc,
      author: author
    };

    
  
    Campground.create(newCampground, function(err, newlyCreated) {
      if (err) {
        console.log("ERROR CREATING NEW CAMPGROUND >>: ", err);
      } else {
        res.redirect("/campgrounds"); //sending to the GET /campgrounds route by default
      }
    });
  });
  
  router.get("/:id", (req, res) => {
    Campground.findById(req.params.id)
      .populate("comments")
      .exec(function(err, foundCampground) {
        if (err) {
          console.log(err);
        } else {
          //console.log(foundCampground);
          //console.log(foundCampground.comments[0]);
          res.render("campgrounds/show", { campground: foundCampground });
        }
      });
  });

  router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render('campgrounds/edit', {campground: foundCampground});
      })
  });

  router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
      if (err){
         res.redirect('/campgrounds');
      }else{
         res.redirect('/campgrounds/' + req.params.id);
      }
    } )
  });

  router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) =>{
      if(err){
         res.redirect('/campgrounds');
      }else{
         req.flash('success', 'Campground deleted');
         res.redirect('/campgrounds');
      }
    })
  });




  
  module.exports = router;