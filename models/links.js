
module.exports = function(sequelize, DataTypes) {
  var Links = sequelize.define("Links", {
    type: {
      type: DataTypes.STRING,
      
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
  },
      {
        classMethods: {
          associate: function(models) {
            Links.belongsTo(models.Topic, {
              foreignKey: {
                allowNull: false
              }
            }); // ends belongsTo
          }
        }
      }
  );
  return Links;
};





