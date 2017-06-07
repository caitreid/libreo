//====================================================================

var express = require("express");
var passport = require("../config/passport");
var router = express.Router();

var db = require("../models");
var request = require("request")
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");




//////////////////////  ROUTES /////////////////////////////////////


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



 // ==================LOG OUT ===============================


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
 


// ========== Render Create Subject ========================================

router.get("/create-subject", function(req, res) {
  // send us to the next get function instead.
  res.render("create-subject");
});



//=================== GET Home page ===================================

router.get("/", function(req, res) {
    db.Subject.findAll({
     
    })
    


//============ GET Home Page ======================

router.get("/", function(req, res) {
    db.Subject.findAll({
    
    })
  

    .then(function(dbSubject) {

    	// console.log(dbSubject);
    	// console.log("-------")
        
        var hbsObject = {
            subject: dbSubject       
        };
        
        return res.render("index", hbsObject);
    })

    

});

// ======================  GET SUBJECT =================================


router.get("/subject", function(req, res) {

  db.Subject.findAll({
    include: [db.Topic],
 

});

// ========== Create Subject Render ====================================

router.get("/create-subject", function(req, res) {
  // send us to the next get function instead.
  res.render("create-subject");
});

// ==========================  SUBJECT Get   ==========================


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




// =============== GET single subject ========================


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



// ====================== GET ALL TOPICS =============================


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





//============ GET ONE TOPIC ============================


router.get("/topic/:id", function(req, res) {
    db.Topic.findAll({
	    where: {
	        id: req.params.id
	    },

	    include: [db.Links]
      
    })

    .then(function(dbTopic) {

    	// console.log(dbTopic[0].dataValues);
    	// console.log("-------")
      // console.log(dbTopic)

    	// console.log(dbTopic[0].dataValues.Links[1].dataValues)


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

    
      // console.log(data)

      // redirect
      res.redirect("/");
    });
});



// =============== GET :CREATE-TOPIC =============



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



// ==============  POST TOPIC =====================



router.post("/create-topic/create", function(req, res) {
 
  db.Topic.create({
    include: [db.Links],
    topic_name: req.body.topic_name,
    decription: req.body.decription
  })
  // pass the result of our call
  .then(function(dbTopic) {

    

    // console.log(dbTopic);
    res.redirect("/"); 
  })

});




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




// ==============  POST LINKS =====================



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



// ==============  GET Field ===============================




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


