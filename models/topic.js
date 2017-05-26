
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
  }, //ends var Topic
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


// {
     //  classMethods: {
     //      associate: function(models) {
     //        // Associating Author with Posts
     //        // When an Topic is deleted, also delete any associated Links
     //        Topic.hasMany(models.Links, {
     //          onDelete: "cascade"
     //        });
     //      }
     //  }
    // },
    // {
    //   classMethods: {
    //     associate: function(models) {
    //       // An Author (foreignKey) is required or a Post can't be made
    //       Topic.belongsTo(models.Subject, {
    //         foreignKey: {
    //           allowNull: false
    //         }
    //       });
    //     }
    //   }
    // }