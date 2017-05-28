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
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Subject.findAll({
      include: [db.Topic]
    }).then(function(dbSubject) {
      res.json(dbSubject);
    });
  });
  //loggedIn added
  app.get("/api/subject/:id", loggedIn, function(req, res, next) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Subject.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Topic]
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


