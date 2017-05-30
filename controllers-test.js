// Requiring our models
var db = require("../models");
var express = require("express");
var users = require('./models/users.js');
var links = require('./models/links.js');
var subject = require('./models/subject.js');
var topic = require('./models/topic.js');
var passport = require('passport');
var Sequelize = require("sequelize");
var sequelize = require("./config/config.js");

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
        model: db.Subject
      },{
        model: db.Topic
      }]
    }).then(function(dbLinks) {
      console.log(dbLinks);
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
        model: db.Subject
      },{
        model: db.Topic
      }]
    }).then(function(dbLinks) {
      console.log(dbLinks);
      res.json(dbLinks);
    });
  });

  // POST route for saving a new post
  app.post("/api/links", loggedIn, function(req, res, next) {
    db.Links.create(req.body).then(function(dbLinks) {
      console.log(dbLinks);
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
      console.log(dbLinks);
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
        console.log(dbLinks);
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
        db.Link.findAll({
                 include: [{
        model: db.Subject
      },{
        model: db.Links
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

    //===============================================================
    //subject

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

    


//=====================================================
//topic

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
      console.log(dbTopic);
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
      console.log(dbTopic);
      res.json(dbTopic);
    });
  });

  app.post("/api/topic", loggedIn, function(req, res, next) {
    db.Topic.create(req.body).then(function(dbTopic) {
      console.log(dbTopic);
      res.json(dbTopic);
    });
  });

  app.delete("/api/topic/:id", loggedIn, function(req, res, next) {
    db.Topic.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTopic) {
      console.log(dbTopic);
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

    //======================================================
    //html

    function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/fields");
});

module.exports = function(app){


  app.get('/login', function(req, res){
    res.render('login');
  });

  app.get('/logout', function(req, res){
    // logout method added by passport
    req.logout(); 
    res.redirect('/');
  });
