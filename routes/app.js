
var express = require("express");
var router = express();



router.get("/search" , function(req , res){
    
    var query = {name : { $regex : req.query.name}};
    db.collection("users").find(query).toArray(function(err, data) {
        if(err) throw err;
        res.json(data)
    });
});



module.exports = router;
