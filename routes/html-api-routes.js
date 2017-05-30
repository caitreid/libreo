var users = require('./models/users.js');
var links = require('./models/links.js');
var subject = require('./models/subject.js');
var topic = require('./models/topic.js');
var passport = require('passport');
var Sequelize = require("sequelize");
var sequelize = require("./config/connection.js");


function loggedIn(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

module.exports = function(app){
	
	// app.get('/', loggedIn, function(req, res) {

	// 	clients.findAll({
	// 		where: {
	// 			employee_id: req.user.id
	// 		},
	// 		include: [{
	// 			model: invoices
	// 		}],
	// 		order: [
	// 			[invoices, 'date_created', 'DESC']
	// 		]
	// 	}).then(function(data){
	// 		// res.json(data);
	// 		res.render('dashboard',{
	// 			isAuthenticated: req.isAuthenticated(),
	// 			user: req.user,
	// 			myClients: data
	// 		});
	// 	});

	// });

	app.get('/login', function(req, res){
		res.render('login');
	});

	app.get('/logout', function(req, res){
		// logout method added by passport
		req.logout();	
		res.redirect('/');
	});