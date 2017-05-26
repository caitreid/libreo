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
    }
  });
  return Subject;
};
