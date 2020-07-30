require('./models/db');
var fs = require('fs');
const bodyParser = require('body-parser');
var express = require('express');
var exphbs = require('express-handlebars');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const flash = require("express-flash");
const session = require("express-session")
const MongoClient = require('mongodb').MongoClient;
var search = require("./routes/app")
app.use(express.static('public'));
const cookieParser = require('cookie-parser');

var sessionStore = new session.MemoryStore;
const employeeController = require('./controllers/employeeController');
app.use("/search" , search);
app.use(session({ secret: '123' }));
app.use(flash(app));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

const controllerR = require("./routes/homeschemaroute");
app.use(controllerR);

app.use('/', employeeController);


//Configure Handlebars
const hbs = exphbs.create({
	extname: '.hbs'
});

// Register Handlebars as view engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));

app.set('view engine', 'hbs');



//database connection-+-
app.locals.db
var url = 'mongodb://localhost:27017';
MongoClient.connect(url,  function(error, client){
    if(error){
        throw error;
	}
	else {
	db = client.db("users");
	console.log("mongo db connected");
	}
    });

	app.get('/',(req,res) => {
		res.sendFile(__dirname + "/signup.html");
	});
	app.get('/login',(req,res) => {
		res.sendFile(__dirname + "/login.html")
	});

	app.get('/newsfeed',  controllerR, (req, res)=>{
		res.render('newsfeed');
	})

	  
	app.get("/newsfeed-friends", function(req, res) {
		  res.render("newsfeed-friends");
		});
	 
	app.get("/newsfeed-images", function(req, res) {
		  res.render("newsfeed-images");
		});
		
		
	  
	app.get("/newsfeed-message", function(req, res) {
		  res.render("newsfeed-message");
		});
		
	  
	app.get("/newsfeed-people-nearby", function(req, res) {
			res.render("newsfeed-people-nearby");
		});
			
	app.get("/newsfeed-notification", function(req, res) {
			  res.render("newsfeed-notification");
		});
			
	app.get("/newsfeed-setting", function(req, res) {
				res.render("newsfeed-setting");
		});    
			  
			  
	app.get("/timeline", function(req, res) {
		res.render("timeline");
		});

// Import Book model



// Start the app on pre defined port number
app.listen(process.env.PORT, function() {
	console.log("Application has started and running on port: ", process.env.PORT);
}).on('error', function(error) {  
	console.log("Unable to start the  app. Error >>>>", error);
});


// Abcabc@123
// abcab1234