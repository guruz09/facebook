/**
 * New node file
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";

exports.checkLogin = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	var username = req.param("email");
	var password = req.param("password");
	
	console.log(username +" is the object");
	console.log(password +" is the object");
	
	var json_responses;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('users');
		coll.findOne({email: username, pwd:password}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				req.session.username = user.email;
				console.log(req.session.username +" is the session");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
			} 
			else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
};

//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//var username = req.param("email");
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		var coll = mongo.collection('users');
		var username = req.session.username;
		
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('users');
			coll.findOne({email: username}, function(err, user){
				if (user) {
					
					// This way subsequent requests will know the user is logged in.
					//Set these headers to notify the browser not to maintain any cache for the page being loaded
					res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
					res.render("home",{ username:user.email, fname:user.fname, lname:user.lname, dob:user.dob, gender:user.gender});
					
				} 
				else {
					console.log("returned false");
					json_responses = {"statusCode" : 401};
					res.send(json_responses);
				}
			});
		});
		
		
	}
	else
	{
		res.redirect('/');
	}
};

//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};

exports.getuser = function(req,res){
	
	var username = req.session.username;
	var json_responses;
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('users');
		coll.findOne({email: username}, function(err, user){
			if (user) {
				console.log(req.session.username +" is the session");
				json_responses = user;
				res.send(json_responses);
			} 
			else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
};
