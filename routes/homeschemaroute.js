//routerr.use('/api', require('./api.v0.js'));
const HomePageSchema = require('./../models/HomePageSchema.js');
const HomePageCommentsSchema = require('./../models/HomePageCommentsSchema.js');
const multer = require("multer");
// Multer

const uploadToMulter = multer({
    storage: multer.diskStorage({})
});

const express = require('express');
const routerr =express.Router();
//const multer = require("multer");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: 'attainutwitterdb',
    api_key: '815441337566478',
    api_secret:'W6OfrsjBqCgHMgWEE9hITZ1dOAw'
})
//const HomePageSchemaController = {};

/*              ========  Creating Post ======== */
routerr.post('/tweetcreate', uploadToMulter.single('TweetHomeInputPicture'), function(req, res){
    
    //console.log(data, req.file);
    console.log("Tweet data is here", req.body.TweetHomeInputText);
    
    //if(req.file!="undefined"){
    //var filesUpload= req.file.path; //TweetHomeInputPicture
    if(!req.file){
        mayank(req, res);
    }
    else{
    mayank1(req, res);
}
function mayank(req, res){
    //var a = req.body;
        var data = req.body;
        console.log("control is inside if statement");
        HomePageSchema.create({
            username: "Mayank",
            post:  data.TweetHomeInputText,
        },
        function(error, response){
            if(error){
                return res.status(500).send({
                    status: false, //message: "failed to create posts",
                    errors: error
                });
            }
                console.log("Inside function homepage create");
                console.log("Printing data", response);
                res.redirect('/newsfeed');
            //         return res.status(200).send({
            //         status: true,
            //         message: "Successfully created post",
            //         data: response
            // })
        });
}

async function mayank1(req, res){
    var data = req.body;
    console.log("data is here",data);
    var filesUpload= req.file.path;
    console.log("file uploaded are here",filesUpload);
    console.log("control is inside else statement")
    const result = await cloudinary.uploader.upload(filesUpload);
    var resultUrl = result.secure_url;
    console.log("Photos are here", filesUpload, req.file, filesUpload); // Path of local for upload file data from form
    console.log("Inside function homepage tweet create", data); // printing request body tweet is here
    HomePageSchema.create({
        username: "Mayank",
        post:  data.TweetHomeInputText,
        uploads: resultUrl,
    },
    function(error, response){
        if(error){
            return res.status(500).send({
                status: false, //message: "failed to create posts",
                errors: error
            });
        }
                console.log("Inside function homepage create");
                console.log("Printing data", response);
                res.redirect('/newsfeed');
        //return res.status(200).send({
            //status: true, 
            //message: "Successfully created post",
            //data: response
        //})
    });
}
})


// Retrieving all data in decending order/*      ========  Creating Post ======== */
routerr.get('/retrieve', function(req, res){
    console.log("inside get");
    HomePageSchema.find({
        //username: req.body.username               //, null, {sort: {date: -1}},
        //uploads: "Uploading is sucessful"
    }, null, {sort: {systemTime: -1}}, function(error, response){    /// .sort({ field: 'descending' }).exec
        if(error){
            return res.status(500).send({
                status: false,
                message: "failed to retrieve posts",
                errors: error
            });
        }
                    //ReferenceError: response is not defined
                console.log("Inside function homepage retrieve");
                //console.log("Printing data after retrieving", response)
        return res.status(200).send({
            status: true,
            message: "Successfully retrieved post",
            data: response
        });
    });
})
// For performing searches /*              ========  Creating Post ======== */
routerr.post('/searchtweet',function(req, res){
    HomePageSchema.find({
        username: "mayank"
    },
    function(error, response){
        if(error){
            return res.status(500).send({
                status: false,
                message: "failed to retrieve single post",
                errors: error
            });
        }
                    //ReferenceError: response is not defined
        console.log("Inside function homepage retrieve");
        console.log("Printing data after finding one", response)
        return res.status(200).send({
            status: true,
            message: "Successfully retrieved single",
            data: response
        });
    });
})

/*              ========  Likes on Posts ======== */
routerr.post('/tweetlike',function(req, res){
    var count = req.body.counter;
    console.log(count);
    count = parseFloat(count)+1;
    console.log(req.body.id, count);
    HomePageSchema.update({
        _id: req.body.id
    },{$set: {likeCount: count}},
    function(error, response){
        if(error){
            return res.status(500).send({
                status: false,
                message: "failed to update posts",
                errors: error
            });
        }
                    //ReferenceError: response is not defined
                console.log("Inside function homepage create");
                console.log("Printing data", response)
        return res.status(200).send({
            status: true,
            message: "Successfully updated post",
            data: response
        });
    })
});

    /*              ========  Commenting on post======== */
routerr.post('/commenting',function(req, res){
    HomePageComments.create({
        postId: req.body.id,//_id: 
    comments: req.body.comment

    }, // add fields here nowww
    function(error, response){
        if(error){
            return res.status(500).send({
                status: false,
                message: "failed to update posts",
                errors: error
            });
        }
                    //ReferenceError: response is not defined
                console.log("Inside function homepage create");
                console.log("Printing data", response)
        return res.status(200).send({
            status: true,
            message: "Successfully updated post",
            data: response
        });
    });
})

/*              ========  Updating TweetPost ======== */
routerr.post('/tweetupdate',function(req, res){
    HomePageSchema.update({
        _id: req.body.id//_id:              NOT USED
    },{$set: {post: req.body.postchange}},
    function(error, response){
        if(error){
            return res.status(500).send({
                status: false,
                message: "failed to update posts",
                errors: error
            });
        }
                    //ReferenceError: response is not defined
                console.log("Inside function homepage create");
                console.log("Printing data", response)
        return res.status(200).send({
            status: true,
            message: "Successfully updated post",
            data: response
        });
    });
})
/*             ========  Deleting TweetPost ======== */
routerr.post('/tweetdelete',function(req, res){
    console.log("Inside delete",req.body);
    console.log("id of the user",req.body.id);
    HomePageSchema.findOneAndRemove({
        _id: req.body.id
    },
    function(error, response){
        if(error){
            return res.status(500).send({
                status: false,
                message: "delete posts",
                errors: error
            });
        }
                    //ReferenceError: response is not defined
                console.log("Inside function homepage delete");
                console.log("Printing data after deleting", response)
        return res.status(200).send({
            status: true,
            message: "Successfully deleted posts",
            data: response
        });
    });
})


module.exports = routerr;


/*
db.find(function (err, db) {
          if (err) return console.error(err);
           console.dir(db);
     });
    */

    // AttainUTweet@123
// Assigned cloud name: attainutwitterdb