const mongoose = require("mongoose");
const HomePageSchema = require("./HomePageSchema.js");
const HomePageComments = require("./HomePageCommentsSchema.js");

function connect(){
    return mongoose.connect('mongodb://localhost:27017/project-homepage',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

console.log("Models index models is working");
module.exports = {
    models: {
        HomePageSchema: HomePageSchema,
        HomePageComments: HomePageComments
    },
    connect: connect
}
