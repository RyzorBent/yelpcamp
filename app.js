const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seeds");
const Comment = require('./models/comment');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const flash = require('connect-flash');

const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');
const methodOverride = require('method-override');

//seedDB();

//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://ryzorbent:m0th3088@ds018708.mlab.com:18708/yelpcamp");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //for using the publics folder, so that express finds /images
app.use(methodOverride('_method'));
app.use(flash()); //must come before passport.use()

//passport config
app.use(require('express-session')({
  secret: "the saints are marching",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user; //mangic, of passing the user object into all pages.
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started ...`);
});

// app.listen(3000, () => {
//   console.log(`Yelp Camp Server started on 3000`);
// });
