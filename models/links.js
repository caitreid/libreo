

module.exports = function(sequelize, DataTypes) {
  var Links = sequelize.define("Links", {
    article: {
      type: DataTypes.TEXT,
      // If a customer is to be created, they must have a name
      allowNull: false
    },
    video: {
    	type: DataTypes.TEXT,
    	allowNull: false
    },
    book: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return Links;
};
