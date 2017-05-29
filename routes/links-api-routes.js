// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

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
