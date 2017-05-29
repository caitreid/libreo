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
   
    db.Topic.findAll({
      include: [{
        model: subject
      },{
        model: links
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
        model: subject
      },{
        model: links
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
