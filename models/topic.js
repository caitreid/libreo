

module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define("Topic", {
    topic_name: {
      type: DataTypes.STRING,
      // If a customer is to be created, they must have a name
      allowNull: false
    },
    decription: {
    	type: DataTypes.TEXT,
    	allowNull: false
    }
  });
  return Topic;
};
