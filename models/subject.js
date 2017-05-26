// Customer model

// The Customer has a "customer" attribute of type DataTypes.String

module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define("Subject", {
  	field_name: {
  		type: DataTypes.STRING,
  		allowNull: false
  	},
    subject_name: {
      type: DataTypes.STRING,
      // If a customer is to be created, they must have a name
      allowNull: false
    },
    // {
	   //  classMethods: {
	   //  	// Associating Subjects with Topics
	   //      associate: function(models) {
	   //        // When an Subject is deleted, also delete any associated Topics
	   //        Subject.hasMany(models.Topic, {
	   //          onDelete: "cascade"
	   //        });
	   //      }
	   //  }
    // }
  });
  return Subject;
};
