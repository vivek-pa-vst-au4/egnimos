const express = require('express');
const path = require('path');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const bcrypt = require('bcrypt');
let saltRounds = 10;
const jwt = require("jsonwebtoken");
var userId = "";
var alert = require("alert-node")
//require('../models/employee.model');//for login part

router.post('/',(req,res) => {
    console.log(req.body);
    insertRecord(req, res);
});


// router.post('/',(req,res) => {
//     console.log(req.body);
//     insertRecord(req, res);
// });



function insertRecord(req, res){

    var password = req.body.password;
   // employee.password = req.body.password;

   bcrypt.hash(password, saltRounds, (err, hash)=> {
    var employee  = new Employee();
    employee.name = req.body.name;
    
    // password
    employee.password = hash;
    console.log(hash);
    employee.dateOfBirth = req.body.dateOfBirth;
    //
    employee.userName = req.body.userName;
    // Employee.findOne({
    //     userName: req.body.userName
    // }, (err, user) =>{
    //     if(user){
    //         res.json("User Found.")
    //     }else if(user == null){
    //         employee.userName = req.body.userName;
    //     }
    // });
    
    employee.save((err, doc) => {
        if(err){
            console.log('error in insertion : ' + err);
            //req.flash({type: "info", message:"This email is taken"});
            //req.flash("error","Username already taken");
            alert('username already taken');
              res.render('/', {layout: false});
           
        } else{
            res.sendFile(path.resolve(__dirname + "./../login.html"));
        }
        console.log(employee.userName);
        console.log(employee);
        
    });
   });
}


// router.get('/login', function(req,res))


router.post('/login', function(req, res) {
  Employee.findOne({
      userName: req.body.userName
  }, (err, user) => {
      if (err) {
          throw err;
      } else if (user == null) {
          //res.json("User Not Found.")
          alert('user not found');
              res.render('/login', {layout: false});
      } else if (user) {
          bcrypt.compare(req.body.password, user.password, function(err, result) {
              if (err) {
                  //return res.json('Unauthorized Access');
                  alert('Unauthorised access');
                res.render('/login', {layout: false});
              }
              if (result) {
                 const JWTToken = jwt.sign(
              {
                username: user.username,
                _id: user._id,
                phone: user.phone
              },
              "secret",
              {
                expiresIn: "2h"
              }
            );
            req.session.token = JWTToken;
            //userId = user.id;
                // return res.redirect("/newsfeed/" + userId);
            
            return res.redirect("/newsfeed");
            // return res.status(200).json({
            //   token: JWTToken,
            //   redirect: "/newsfeed",
            //   success: "Login Success"
            // });
          }
          alert('Incorrect Password');
              res.render('/login', {layout: false});
        });

      }
  })
});

// router.get('/newsfeed', (req, res) => {
//     res.json('sample');
//     //  Employee.findById({_id : req.params.id}, (err, user) => {
//     //     if(err){
//     //         throw err
//     //     } else{
//     //         res.json('sample');
//     //         //  res.render("./../views/newsfeed.hbs", {
//     //         //      layout: false,
//     //         //      list: user
//     //         //  });
//     //         //console.log(user);
//     //         //res.json(user);
//     //     }
//      //});
// });
//profile part

router.get('/profiles', (req, res) => {
    //res.json('sample');
    Employee.find()
    .then(employees => {
        res.json({
            confirmation: 'success',
            data: employees
        })
    })
    .catch(err => {
        res.json({
            message: err.message
        })
    })
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.json("logout");
  });
  


module.exports = router ;