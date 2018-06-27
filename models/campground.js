let mongoose = require('mongoose');


let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model("Campground", campgroundSchema); // model for our schema, to get methods: find(), update(), etc