
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var session = require("express-session");

// bring in the models
var db = require("./models");
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/controllers");

app.use("/", routes);


// listen on port 3000
var port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
  app.listen(port);
  console.log("app is **LIVE** listening on port: " + port)
});









