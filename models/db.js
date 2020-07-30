require('./employee.model');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
    if(!err) { console.log('MongoDb connection succeeded') }
    else{ console.log(' Error in DB connection : ' + err)}
});
