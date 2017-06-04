// =====================

var express = require("express");
var passport = require("../config/passport");
var router = express.Router();
// grabbing our models
var db = require("../models");
var request = require("request")
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// ROUTES //////////////////////////////////////


// ==============  SIGN UP ================================
router.get("/signup", function(req, res) {
  // send us to the next get function instead.
  res.render("signup");
});



// ===========  Login page =================================
router.get("/login", function(req, res) {
    res.render("login", "");
    if (req.user){
      res.redirect("/members");
    }
});

router.get("/members", function(req, res) {
    res.render("members", "");
});


 // =====Route for logging user out============================

  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  router.get("/members", isAuthenticated, function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
  });

// ====Route for getting some data about our user to be used client side========

  router.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //=====================Sign Up Post Route ================================
  router.post("/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect("/login");
    }).catch(function(err) {
      console.log(err);
    });
  });

 router.post("/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.redirect("/members");
  });
 

// ==========  render Create Subject ===========
router.get("/create-subject", function(req, res) {
  // send us to the next get function instead.
  res.render("create-subject");
});

// ==========  render Create Topic ===========
router.get("/create-topic", function(req, res) {
  // send us to the next get function instead.
  res.render("create-topic");
});

// ==========  render Create Links ===========
router.get("/create-links", function(req, res) {
  // send us to the next get function instead.
  res.render("create-links");
});

//============ GET home page ===============

router.get("/", function(req, res) {
    db.Subject.findAll({
        where: {
    		field_name : 'Business'
    	}
        // order: [
        //     ["id", "ASC"] 
        // ]
    })
    .then(function(dbBiz){
    	var bizObj = {
    		biz: dbBiz
    	}
    	return res.render(bizObj)
    }),
    db.Subject.findAll({
    	where: {
    		field_name : 'Technology'
    	}
    })
    .then(function(dbSubject) {
    	console.log(dbSubject);
    	console.log("-------")
        
        var testing1 = {
            subject: dbSubject       
        };
        
        return res.render("index", testing1);
    })

    // db.Subject.findAll({
    // 	where: {
    // 		field_name : 'Technology'
    // 	}
    // }).then(function(dbTech) {

    // 	// console.log(dbTech.dataValues.subject_name);
    // 	// console.log("-------")
        
    //     var hbsObject = {
    //         tech: dbTech
    //     };
        
    //     return res.render("index", hbsObject);

    // });
});

// =============  SUBJECT ================


router.get("/subject", function(req, res) {
  // replace old function with sequelize function
  db.Subject.findAll({
    include: [db.Topic],
     // ???
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

    return res.render("subject", hbsObject);
  });
});

// include all topics where subjectId == subject.id



// =============== GET single subject ==============
router.get("/subject/:id", function(req, res) {
  // replace old function with sequelize function
  db.Subject.findAll({
  	where: {
        id: req.params.id
      },
    include: [db.Topic], // ???
    // Here we specify we want to return our subjects in ordered by ascending subject_name
    order: [
      ["id", "ASC"] // what is the exact name here???
    ]
  })
  // use promise method to pass the subjects...
  .then(function(dbSubject) {
  	console.log(dbSubject[0].dataValues.subject_name)
    // into the main index, updating the page
    var testing = {
      subject: dbSubject,
      // subject_name: dbSubject[0],
      topic: dbSubject[0].Topics,
      // test: 'HELLO'
    };
  	
    return res.render("subject", testing);
  });
});




// ============ GET ALL TOPICS ==============
router.get("/topic", function(req, res) {
  // replace old function with sequelize function
  db.Topic.findAll({
    include: [db.Links], // ???
    // include: [db.Links.TopicId],
    // Here we specify we want to return our subjects in ordered by ascending subject_name
    order: [
      ["topic_name", "ASC"] // what is the exact name here???
    ]
  })
  // use promise method to pass the subjects...
  .then(function(dbTopic) {
    // into the main index, updating the page
    // console.log(dbTopic);
    var hbsObject = {
      topic: dbTopic
    };
    console.log(hbsObject);

    console.log("------")
    console.log(db.Links.TopicId);


    return res.render('topic', hbsObject);

    // res.render("index", hbsObject);
    
  });

  // console.log("this is a test.")
});




//============ FIND ONE TOPIC ================
router.get("/topic/:id", function(req, res) {
    db.Topic.findAll({
	    where: {
	        id: req.params.id
	    },

	    include: [db.Links],
	    // include: [db.Subjects],

        order: [
      		["id", "ASC"] // what is the exact name here???
        ]
    }).then(function(dbTopic) {
    	console.log(dbTopic[0].dataValues.Links);
    	console.log("-------")

    	console.log(dbTopic[0].dataValues.Links[1].dataValues)

    	// console.log(dbTopic[0].dataValues.Links)
    	// console.log(dbTopic[0].Instance.dataValues)
	   
	    var hbsObject = {
	      topic: dbTopic,
	      topic2: dbTopic[0].Links,
	      // subject_name: dbTopic[0].Instance.dataValues,
	      links: dbTopic[0].dataValues.Links,
	    };
      	return res.render('topic', hbsObject);
      
    });
  });



// ==================POST subjects=========================
router.post("/create-subject", function(req, res) {
    // edited burger create to add in a burger_name
    db.Subject.create({
        subject_name:req.body.subject_name,
        field_name: req.body.field_name
    })
    // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            console.log(data);
            // redirect
            res.redirect("/");
        });
});


// ==============  POST TOPIC =====================
router.post("/create-topic", function(req, res) {
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



// ==============  POST LINKS =====================
router.post("/create-links", function(req, res) {
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

router.get("/field/:id", function(req, res) {
  // replace old function with sequelize function
  db.Subject.findOne({
  	where: {
  		id: req.params.field_name
  	},
    include: [db.Topic], 

    order: [
      ["subject_name", "ASC"] // what is the exact name here???
    ]

  })
  .then(function(dbSubject) {
    // into the main index, updating the page
    var hbsObject = {
      subject: dbSubject
    };

    return res.render("subject", hbsObject);
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





// // TOPICS
// router.get("/links", function(req, res) {
//   // replace old function with sequelize function
//   db.Links.findAll({
//     // include: [db.Links], // ???
//     // Here we specify we want to return our subjects in ordered by ascending subject_name
//     order: [
//       ["id", "ASC"] // 
//     ]
//   })
//   // use promise method to pass the subjects...
//   .then(function(dbSubject) {
//     // into the main index, updating the page
//     var hbsObject = {
//       subject: dbSubject
//     };
//     return res.render("index", hbsObject);
//   });
// });
