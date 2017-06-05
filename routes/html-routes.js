var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // authors route loads author-manager.html
  app.get("/create-links", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

};