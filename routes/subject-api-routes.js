var db = require("../models");
var express = require("express");
var users = require('./models/users.js');
var links = require('./models/links.js');
var subject = require('./models/subject.js');
var topic = require('./models/topic.js');
var passport = require('passport');
var Sequelize = require("sequelize");
var sequelize = require("./config/config.js");

module.exports = function(app) {
    //loggedIn is added
  function loggedIn(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }

  app.get("/api/subject", loggedIn, function(req, res, next) {
    // including topic and links as two objects in include array
    db.Subject.findAll({
      include: [
      {
        model: db.Topic,
        include: [
        {
          model: db.Links
        }
      ]
    }
    ]
    
    }).then(function(dbSubject) {
      console.log(dbSubject);
      res.json(dbSubject);
    });
  });
  //loggedIn added
  app.get("/api/subject/:id", loggedIn, function(req, res, next) {
    
    db.Subject.findOne({
      where: {
        id: req.params.id
      },
       include: [
      {
        model: db.Topic,
        include: [
        {
          model: db.Links
        }
      ]
    }
    ]
    
    
    }).then(function(dbSubject) {
      console.log(dbSubject);
      res.json(dbSubject);
    });
  });

  app.post("/api/subject", loggedIn, function(req, res, next) {
    db.Subject.create(req.body).then(function(dbSubject) {
      console.log(dbSubject);
      res.json(dbSubject);
    });
  });

  app.delete("/api/subject/:id", loggedIn, function(req, res, next) {
    db.Subject.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSubject) {
      console.log(dbSubject);
      res.json(dbSubject);
    });
  });

};

  app.get('/create-subject', loggedIn, function(req, res, next){
        console.log('userID:');
        console.log(req.user.id);
        res.render('create-subject',{
            // isAuth returns true or false
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    });


    app.get('/subject', loggedIn, function(req, res, next){
        db.Subject.findAll({
                   include: [
              {
                model: db.Topic,
                include: [
                {
                  model: db.Links
                }
              ]
            }
            ],
            order: 'id DESC'
        }).then(function(result){
            //var data = {'subject':result};
            //res.json(data);
            res.render('subject',{'subject':result,
                // isAuth returns true or false
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            });
        });
    });

    


