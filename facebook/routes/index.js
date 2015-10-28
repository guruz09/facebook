
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('login', { title: 'Express' });
};

exports.loginTemplate = function(req, res){
	  res.render('loginTemplate', { title: 'Express' });
	};
	
exports.register = function(req,res){
	console.log("I got the data");
	console.log(req.body);
	var newusr = req.body;
	
	var fname1 = req.param('firstname');
	var lname1 = req.param('lastname');
	var email1 = req.param('email');
	var pwd1 = req.param('password');
	var dob1 = req.param('dob');
	var gender1 = req.param('gender');
	
	var mongoose = require('mongoose');

	var db=mongoose.connection;
	mongoose.connect('mongodb://localhost:27017/myfacebook');

	db.on('error',console.error.bind(console, 'connection error:'));

	
	//open the connection 
	db.once('open', function() {
		
		var UserSchema = new mongoose.Schema({
			title: { type: String },
			fname : String,
			lname : String,
			email : String,
			pwd : String,
			dob : String,
			gender : String
		});
		
		var User = mongoose.model('users', UserSchema);
						
		var usr = new User({
			fname : fname1,
			lname : lname1,
			email : email1,
			pwd : pwd1,
			dob : dob1,
			gender : gender1
		});
			
		console.log("Saving user here");
		usr.save(function(err, usr) {
			if (err) { 
				return console.error(err); 
			}
			console.dir(usr);
		});
			
	});
	
	
};