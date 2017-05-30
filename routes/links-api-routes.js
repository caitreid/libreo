

// Requiring our models
var db = require("../models");
var users = require('./models/users.js');
var links = require('./models/links.js');
var subject = require('./models/subject.js');
var topic = require('./models/topic.js');
var passport = require('passport');
var Sequelize = require("sequelize");
var sequelize = require("./config/connection.js");

// Routes
// =============================================================
module.exports = function(app) {

 function loggedIn(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }

  // GET route for getting all of the links
  app.get("/api/links", loggedIn, function(req, res, next) {
    var query = {};
    if (req.query.topic_id) {
      query.TopicId = req.query.topic_id;
    }
   //left outer join including both sunject and topic
    db.Links.findAll({
      where: query,
      include: [{
        model: subject
      },{
        model: topic
      }]
    }).then(function(dbLinks) {
      res.json(dbLinks);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/links/:id", loggedIn, function(req, res, next) {
  
    db.Links.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: subject
      },{
        model: topic
      }]
    }).then(function(dbLinks) {
      res.json(dbLinks);
    });
  });

  // POST route for saving a new post
  app.post("/api/links", loggedIn, function(req, res, next) {
    db.Links.create(req.body).then(function(dbLinks) {
      res.json(dbLinks);
    });
  });

  // DELETE route for deleting links
  app.delete("/api/links/:id", loggedIn, function(req, res, next) {
    db.Links.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbLinks) {
      res.json(dbLinks);
    });
  });

  // PUT route for updating links
  app.put("/api/links", loggedIn, function(req, res, next) {
    db.Links.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbLinks) {
        res.json(dbLinks);
      });
  });
};

 app.get('/create-link', loggedIn, function(req, res, next){
        console.log('userID:');
        console.log(req.user.id);
        res.render('create-link',{
            // isAuth returns true or false
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    });


    app.get('/link', loggedIn, function(req, res, next){
        link.findAll({
                 include: [{
        model: subject
      },{
        model: links
      }],
            order: 'id DESC'
        }).then(function(result){
            //var data = {'link':result};
            //res.json(data);
            res.render('link',{'link':result,
                // isAuth returns true or false
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            });
        });
    });