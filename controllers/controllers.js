<<<<<<< HEAD
// ======================================================
=======
// ========================================================
>>>>>>> master

var express = require("express");
var passport = require("../config/passport");
var router = express.Router();
// grabbing our models
var db = require("../models");
var request = require("request")
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

<<<<<<< HEAD


//////////////////////// ROUTES /////////////////////////////////


// ==================  Sign Up =============================
=======

//////////////////////  ROUTES /////////////////////////////////////


// ==============  SIGN UP ================================
>>>>>>> master

router.get("/signup", function(req, res) {
  // send us to the next get function instead.
  res.render("signup");
});


// ===========  LOG IN  ====================================

<<<<<<< HEAD
// ===========  Login page =================================

=======
>>>>>>> master
router.get("/login", function(req, res) {
    res.render("login", "");
    if (req.user){
      res.redirect("/members");
    }
});

router.get("/members", function(req, res) {
    res.render("members", "");
});


<<<<<<< HEAD
 // ============ Logging user out============================
=======
 // ==================LOG OUT ===============================
>>>>>>> master

  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

//====================== MEMBERS if authenticated ==============
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
      res.redirect(307,"/login");
    }).catch(function(err) {
      console.log(err);
    });
  });

 router.post("/login", passport.authenticate("local"), function(req, res) {
    
    res.redirect("/members");
  });
 

<<<<<<< HEAD
// ========== Render Create Subject ========================================

router.get("/create-subject", function(req, res) {
  // send us to the next get function instead.
  res.render("create-subject");
});



//=================== GET Home page ===================================

router.get("/", function(req, res) {
    db.Subject.findAll({
     
    })
    
=======

//============ GET Home Page ======================

router.get("/", function(req, res) {
    db.Subject.findAll({
    
    })
  
>>>>>>> master
    .then(function(dbSubject) {

    	// console.log(dbSubject);
    	// console.log("-------")
        
        var hbsObject = {
            subject: dbSubject       
        };
        
        return res.render("index", hbsObject);
    })

    
<<<<<<< HEAD
});

// ======================  GET SUBJECT =================================


router.get("/subject", function(req, res) {

  db.Subject.findAll({
    include: [db.Topic],
 
=======
});

// ========== Create Subject Render ===========

router.get("/create-subject", function(req, res) {
  // send us to the next get function instead.
  res.render("create-subject");
});

// =============  SUBJECT Get   ==========================


router.get("/subject", function(req, res) {
  
  db.Subject.findAll({
    include: [db.Topic],
    
>>>>>>> master
    // Here we specify we want to return our subjects in ordered by ascending subject_name
    order: [
      ["subject_name", "ASC"] 
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



<<<<<<< HEAD
// =============== GET Single subject ==============

=======
// =============== GET single subject ========================
>>>>>>> master

router.get("/subject/:id", function(req, res) {
  // replace old function with sequelize function
  db.Subject.findAll({
  	where: {
        id: req.params.id
      },
    include: [db.Topic], 
    // Here we specify we want to return our subjects in ordered by ascending subject_name
    order: [
      ["id", "ASC"] 
    ]
  })
  // use promise method to pass the subjects...
  .then(function(dbSubject) {

  	// console.log(dbSubject[0].dataValues.subject_name)
    // into the main index, updating the page
    var testing = {
      subject: dbSubject,
     
      topic: dbSubject[0].Topics,
      
    };
  	
    return res.render("subject", testing);
  });
});


<<<<<<< HEAD
// ============ GET ALL TOPICS ================================
=======
// ============ GET ALL TOPICS =============================
>>>>>>> master

router.get("/topic", function(req, res) {
 
  db.Topic.findAll({
    include: [db.Links], 
    
    // Here we specify we want to return our topics in ordered by ascending topic_name
    order: [
      ["topic_name", "ASC"] 
    ]
  })
  // use promise method to pass the subjects...
  .then(function(dbTopic) {
    
    // console.log(dbTopic);
    var hbsObject = {
      topic: dbTopic
    };
    // console.log(hbsObject);

    // console.log("------")
    // console.log(db.Links.TopicId);


    return res.render('topic', hbsObject);


    
  });

  // console.log("this is a test.")
});




<<<<<<< HEAD
//============ FIND ONE TOPIC ==============================

=======
//============ GET ONE TOPIC ============================
>>>>>>> master

router.get("/topic/:id", function(req, res) {
    db.Topic.findAll({
	    where: {
	        id: req.params.id
	    },

	    include: [db.Links]
      
    })

    .then(function(dbTopic) {
<<<<<<< HEAD
    	// console.log(dbTopic[0].dataValues);
    	// console.log("-------")
      // console.log(dbTopic)

    	// console.log(dbTopic[0].dataValues.Links[1].dataValues)
=======
>>>>>>> master

    	// console.log(dbTopic[0].dataValues);
    	// console.log("-------")
      // console.log(dbTopic)
	   
	    var hbsObject = {
	      topic: dbTopic,
	      topic2: dbTopic[0].Links,
	     
	      links: dbTopic[0].dataValues.Links,
	    };
      	return res.render('topic', hbsObject);
      
    });
  });



// ==================POST Subjects=========================


router.post("/create-subject", function(req, res) {
  db.Subject.create({
      include: [db.Topic],
      subject_name:req.body.subject_name,
      field_name: req.body.field_name
  })
  // pass the result of our call
    .then(function(data) {
<<<<<<< HEAD
    
      // console.log(data);
    
=======
      // log the result to our terminal/bash window
      // console.log(data);
      

>>>>>>> master
      // redirect
      res.redirect("/");
    });
});


<<<<<<< HEAD
// =============== GET : CREATE-TOPIC =======================
=======
// =============== GET :CREATE-TOPIC =============
>>>>>>> master


router.get("/create-topic", function(req, res) {
  // replace old function with sequelize function
  db.Subject.findAll({
   
    order: [
      ["subject_name", "DESC"]
    ]
  })
  .then(function(dbSubject) {
    // console.log(dbSubject);
    // console.log("this is happening")

    var hbsObject = {
        subject: dbSubject,
        id: dbSubject.id
      };
    return res.render("create-topic", hbsObject);
  });
});


<<<<<<< HEAD
// ==============  POST TOPIC ==============================
=======
// ==============  POST TOPIC =====================

>>>>>>> master

router.post("/create-topic/create", function(req, res) {
 
  db.Topic.create({
    include: [db.Links],
    topic_name: req.body.topic_name,
    decription: req.body.decription
  })
  // pass the result of our call
  .then(function(dbTopic) {
<<<<<<< HEAD
  
=======
    
>>>>>>> master
    // console.log(dbTopic);
    res.redirect("/"); 
  })

});



<<<<<<< HEAD
// =============== GET : CREATE-LINKS ====================
=======
// =============== GET : CREATE-LINKS ================
>>>>>>> master


router.get("/create-links", function(req, res) {
 
  db.Topic.findAll({
    // include: [db.Topic],
    order: [
      ["topic_name", "DESC"]
    ]
  })
  .then(function(dbTopic) {
    
    console.log(dbTopic);
    // console.log("this is happening")

    var hbsObject = {
        topic: dbTopic,
        
      };
    return res.render("create-links", hbsObject);
  });
});



<<<<<<< HEAD
// ==============  POST LINKS ==============================
=======
// ==============  POST LINKS =====================

>>>>>>> master

router.post("/create-links/create", function(req, res) {
  db.Links.create({
    include: [db.Topic],

    type: req.body.type,
    title: req.body.title,
    url: req.body.url,
    TopicId: req.body.TopicId
  })
  
  .then(function(dbLinks) {

    // console.log(dbLinks);
    // console.log(TopicId)

    // redirect
    res.redirect("/");
  })
  .catch(function (err) {
    console.log(err)
  });
});


<<<<<<< HEAD
// ==============  GET Field ============================
=======
// ==============  GET Field =====================


>>>>>>> master

router.get("/field/:id", function(req, res) {
  // replace old function with sequelize function
  db.Subject.findOne({
  	where: {
  		id: req.params.field_name
  	},
    include: [db.Topic], 

    order: [
      ["subject_name", "ASC"] 
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


<<<<<<< HEAD
=======





>>>>>>> master
