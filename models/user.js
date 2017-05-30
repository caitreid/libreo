var Sequelize = require("sequelize"); 
var sequelize = require("./config/config.js"); 
var User = sequelize.define("User", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	user_name: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	return User;	
}
return User;
);


user.sync({}).then(function () {
  // Table created
  console.log('user table created')
});

// Makes the user Model and will also create a table
module.exports = User;