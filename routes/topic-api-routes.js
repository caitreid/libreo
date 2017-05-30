var db = require("../models");
var express = require("express");
var users = require('./models/users.js');
var links = require('./models/links.js');
var subject = require('./models/subject.js');
var topic = require('./models/topic.js');
var passport = require('passport');
var Sequelize = require("sequelize");
var sequelize = require("./config/connection.js");

module.exports = function(app) {

  function loggedIn(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }

  app.get("/api/topic", loggedIn, function(req, res, next) {
   
    db.Topic.findAll({
      include: [{
        model: db.Subject
      },{
        model: db.Links
      }]
    }).then(function(dbTopic) {
      res.json(dbTopic);
    });
  });

  app.get("/api/topic/:id", loggedIn, function(req, res, next) {
    
    db.Topic.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.Subject
      },{
        model: db.Links
      }]
      
    }).then(function(dbTopic) {
      res.json(dbTopic);
    });
  });

  app.post("/api/topic", loggedIn, function(req, res, next) {
    db.Topic.create(req.body).then(function(dbTopic) {
      res.json(dbTopic);
    });
  });

  app.delete("/api/topic/:id", loggedIn, function(req, res, next) {
    db.Topic.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTopic) {
      res.json(dbTopic);
    });
  });

};

 app.get('/create-topic', loggedIn, function(req, res, next){
        console.log('userID:');
        console.log(req.user.id);
        res.render('create-topic',{
            // isAuth returns true or false
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    });


    app.get('/topic', loggedIn, function(req, res, next){
        db.Topic.findAll({
                 include: [{
        model: db.Subject
      },{
        model: db.Links
      }],
            order: 'id DESC'
        }).then(function(result){
            //var data = {'topic':result};
            //res.json(data);
            res.render('topic',{'topic':result,
                // isAuth returns true or false
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            });
        });
    });