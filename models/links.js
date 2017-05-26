

module.exports = function(sequelize, DataTypes) {
  var Links = sequelize.define("Links", {
    type: {
      type: DataTypes.STRING,
      // If a customer is to be created, they must have a name
      allowNull: false
    },
    title: {
    	type: DataTypes.TEXT,
    	allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return Links;
};
