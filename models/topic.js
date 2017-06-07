
module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define("Topic", {
    topic_name: {
      type: DataTypes.STRING,
      
      allowNull: false
    },
    decription: {
    	type: DataTypes.TEXT,
    	allowNull: false
    }
  }, 
    {
      classMethods: {
        associate: function(models) {
          Topic.hasMany(models.Links, {
            onDelete: "cascade"
          });
        }
      }
    },

      {
        classMethods: {
          associate: function(models) {
            Topic.belongsTo(models.Subject, {
              foreignKey: {
                allowNull: false 
              }
            }); //ends belongsTo
          }
        }
      }
    )
  return Topic;
};


