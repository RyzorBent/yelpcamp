let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require('./models/comment');

let testData = [
  {
    name: "Soweto",
    image: "/images/soweto.png",
    description: "Ut interdum tincidunt eros, quis pellentesque quam sodales ut. Vivamus metus libero, varius eget turpis non, rhoncus vehicula odio. Proin ultrices tempus dui id scelerisque. Nulla non ex efficitur, sodales est consequat, tristique nulla. Aliquam erat volutpat. Quisque a dolor urna. Nullam convallis, dui a vehicula tristique, urna mauris tristique erat, a congue nulla ante id ipsum. Vivamus eleifend nisl a neque pretium elementum. Integer at accumsan ligula. Sed venenatis iaculis ex ut rhoncus. Aenean eget ullamcorper lorem"
  },
  {
    name: "Alexandra",
    image: "/images/alexandra.png",
    description: "Ut interdum tincidunt eros, quis pellentesque quam sodales ut. Vivamus metus libero, varius eget turpis non, rhoncus vehicula odio. Proin ultrices tempus dui id scelerisque. Nulla non ex efficitur, sodales est consequat, tristique nulla. Aliquam erat volutpat. Quisque a dolor urna. Nullam convallis, dui a vehicula tristique, urna mauris tristique erat, a congue nulla ante id ipsum. Vivamus eleifend nisl a neque pretium elementum. Integer at accumsan ligula. Sed venenatis iaculis ex ut rhoncus. Aenean eget ullamcorper lorem"
  },
  {
    name: "Tembisa",
    image: "/images/tembisa.png",
    description: "Ut interdum tincidunt eros, quis pellentesque quam sodales ut. Vivamus metus libero, varius eget turpis non, rhoncus vehicula odio. Proin ultrices tempus dui id scelerisque. Nulla non ex efficitur, sodales est consequat, tristique nulla. Aliquam erat volutpat. Quisque a dolor urna. Nullam convallis, dui a vehicula tristique, urna mauris tristique erat, a congue nulla ante id ipsum. Vivamus eleifend nisl a neque pretium elementum. Integer at accumsan ligula. Sed venenatis iaculis ex ut rhoncus. Aenean eget ullamcorper lorem"
  }
];

function seedDB() {
  Campground.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed Campgrounds");
      testData.forEach(seed => {
        Campground.create(seed, (err, campground) => {
          if (err) {
            console.log(err);
          } else {
            console.log("created a camp ground");
            Comment.create(
              {
                text: "i really love this place",
                author: "Ryzor"
              },
              (err, comment) => {
                if (err) {
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log('new comment created');
                }
              }
            );
          }
        });
      });
    }
  });
}

module.exports = seedDB;
