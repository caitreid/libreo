var db = require("../models");

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
      include: [{
        model: topic
      },{
        model: links
      }]
    }).then(function(dbSubject) {
      res.json(dbSubject);
    });
  });
  //loggedIn added
  app.get("/api/subject/:id", loggedIn, function(req, res, next) {
    
    db.Subject.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: topic
      },{
        model: links
      }]
    }).then(function(dbSubject) {
      res.json(dbSubject);
    });
  });

  app.post("/api/subject", loggedIn, function(req, res, next) {
    db.Subject.create(req.body).then(function(dbSubject) {
      res.json(dbSubject);
    });
  });

  app.delete("/api/subject/:id", loggedIn, function(req, res, next) {
    db.Subject.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSubject) {
      res.json(dbSubject);
    });
  });

};


