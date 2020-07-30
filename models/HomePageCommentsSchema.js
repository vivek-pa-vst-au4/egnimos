const mongoose = require("mongoose");
const homeComments = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    postId: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
},{
    collection: 'HomePageComments'
})

const HomePageComments = mongoose.model('HomePageComments', homeComments);

module.exports = HomePageComments;