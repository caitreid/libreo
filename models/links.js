
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


// {
//       // We're saying that we want our Topics to have Links
//       classMethods: {
//         associate: function(models) {
//           // An Author (foreignKey) is required or a Post can't be made
//           Links.belongsTo(models.Topic, {
//             foreignKey: {
//               allowNull: false
//             }
//           });
//         }
//       }
//     }


