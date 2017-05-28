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
  app.get("/api/links", function(req, res, next) {
    var query = {};
    if (req.query.topic_id) {
      query.TopicId = req.query.topic_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Links.findAll({
      where: query,
      include: [db.Topic]
    }).then(function(dbLinks) {
      res.json(dbLinks);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/links/:id", function(req, res, next) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Links.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Topic]
    }).then(function(dbLinks) {
      res.json(dbLinks);
    });
  });

  // POST route for saving a new post
  app.post("/api/links", function(req, res, next) {
    db.Links.create(req.body).then(function(dbLinks) {
      res.json(dbLinks);
    });
  });

  // DELETE route for deleting links
  app.delete("/api/links/:id", function(req, res, next) {
    db.Links.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbLinks) {
      res.json(dbLinks);
    });
  });

  // PUT route for updating links
  app.put("/api/links", function(req, res, next) {
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
