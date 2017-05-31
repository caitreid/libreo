// =====================

var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");

// Routes
// =====================
// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/");
});

// get route, edited to match sequelize
router.get("/subjects", function(req, res) {
  // replace old function with sequelize function
  db.Subject.findAll({
    include: [db.Topic], // ???
    // Here we specify we want to return our subjects in ordered by ascending subject_name
    order: [
      ["subject_name", "ASC"] // what is the exact name here???
    ]
  })
  // use promise method to pass the subjects...
  .then(function(dbSubject) {
    // into the main index, updating the page
    var hbsObject = {
      subject: dbSubject
    };
    return res.render("index", hbsObject);
  });
});


// TOPICS
router.get("/topics", function(req, res) {
  // replace old function with sequelize function
  db.Topic.findAll({
    include: [db.Links], // ???
    // Here we specify we want to return our subjects in ordered by ascending subject_name
    order: [
      ["topic_name", "ASC"] // what is the exact name here???
    ]
  })
  // use promise method to pass the subjects...
  .then(function(dbSubject) {
    // into the main index, updating the page
    var hbsObject = {
      subject: dbSubject
    };
    return res.render("index", hbsObject);
  });
});


// TOPICS
router.get("/links", function(req, res) {
  // replace old function with sequelize function
  db.Links.findAll({
    // include: [db.Links], // ???
    // Here we specify we want to return our subjects in ordered by ascending subject_name
    order: [
      ["id", "ASC"] // 
    ]
  })
  // use promise method to pass the subjects...
  .then(function(dbSubject) {
    // into the main index, updating the page
    var hbsObject = {
      subject: dbSubject
    };
    return res.render("index", hbsObject);
  });
});





// post route to create burgers
router.post("/subjects/create-subject", function(req, res) {
  // edited burger create to add in a burger_name
  db.Subject.create({
    subject_name: req.body.subject_name
  })
  // pass the result of our call
  .then(function(dbSubject) {
    // log the result to our terminal/bash window
    console.log(dbSubject);
    // redirect
    res.redirect("/subjects");
  });
});

// how do we make all of these "create" things available on the same page???


// post route to create burgers
router.post("/topics/create-topic", function(req, res) {
  // edited burger create to add in a burger_name
  db.Topic.create({
    topic_name: req.body.topic_name
  })
  // pass the result of our call
  .then(function(dbTopic) {
    // log the result to our terminal/bash window
    console.log(dbTopic);
    // redirect
    res.redirect("/topics/:id"); // ???? come back to this
  });
});



// post route for links
router.post("/links/create-links", function(req, res) {
  // edited burger create to add in a burger_name
  db.Links.create({
    link_name: req.body.link_name // double check the name of the column
  })
  // pass the result of our call
  .then(function(dbLinks) {
    // log the result to our terminal/bash window
    console.log(dbLinks);
    // redirect
    res.redirect("/links");
  });
});




module.exports = router;

// EDIT / UPDATE

// // put route to devour a burger
// router.put("/burgers/update", function(req, res) {
//   // If we are given a customer, create the customer and give them this devoured burger
//   if (req.body.customer) {
//     db.Customer.create({
//       customer: req.body.customer,
//       BurgerId: req.body.burger_id
//     })
//     .then(function(dbCustomer) {
//       return db.Burger.update({
//         devoured: true
//       }, {
//         where: {
//           id: req.body.burger_id
//         }
//       });
//     })
//     .then(function(dbBurger) {
//       res.redirect("/");
//     });
//   }
//   // If we aren't given a customer, just update the burger to be devoured
//   else {
//     db.Burger.update({
//       devoured: true
//     }, {
//       where: {
//         id: req.body.burger_id
//       }
//     })
//     .then(function(dbBurger) {
//       res.redirect("/");
//     });
//   }
// });


