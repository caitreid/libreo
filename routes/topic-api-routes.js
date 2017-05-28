var db = require("../models");

module.exports = function(app) {

  function loggedIn(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }

  app.get("/api/topic", loggedIn, function(req, res, next) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Topic.findAll({
      include: [db.Subject, db.Links]
    }).then(function(dbTopic) {
      res.json(dbTopic);
    });
  });

  app.get("/api/topic/:id", loggedIn, function(req, res, next) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Topic.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Subject, db.Links]
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
