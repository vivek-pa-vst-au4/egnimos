const moment = require("moment");
const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: false // Will be true in production
    },
    username: {
        type: String,
        required: false // Not needed will be retrieved from login
    },
    post: {
        type: String,
        required: false
    },
    postId: {
        type: String,
        required: false // Will be true and unique also true, Will connect to comments
    },
    uploads: {
        type: String,
        required: false,
        default: "No files uploaded"
    },
    likeCount: {
        type: Number,
        required: true,
        default: 0
         // Will be automatically incremented
    },
    
    shareCount: {
        type: Number,
        required: false // Will be automatically incremented
    },
    createdAt: {
        type: String,
        //default: Date(),
        default: moment().calendar(),
        //default: moment().format('ll'),
        // (new Date())
        required: true
    },
    systemTime: {
        type: Date,
        default: Date.now
    }
},{
    collection: 'HomePageSchema'
})
const HomePageSchema = mongoose.model('HomePageSchema', homeSchema);
module.exports = HomePageSchema;

// AttainUTweet@123
// Assigned cloud name: attainutwitterdb