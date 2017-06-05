// ;var express = require('express');
// var path = require('path');
// var app = express();
// var exphbs = require("express-handlebars"); app.engine('handlebars', 
// exphbs({defaultLayout: 'main'})); app.set('view engine', 'handlebars');
// app.set('port', process.env.PORT || 8080);
// var options = { dotfiles: 'ignore', etag: false,
// extensions: ['htm', 'html'],
// index: false
// };

// app.use(express.static(path.join(__dirname, 'public') , options  ))



//------------------



// var db = require("../models");
// // var express = require("express");
// // var router = express.Router();


// module.exports = function(app) {
// 	app.get("/api/create-link", function(req, res) {
// 	    db.Topic.findAll({
// 	      where: {
// 	        id: req.params.id
// 	      },
// 	      // include: [db.Post] //left outer join
// 	    }).then(function(dbTopic) {
// 	      res.json(dbTopic);
// 	      console.log(dbTopic)
// 	    });
// 	});	
// }