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
  },
    {
      classMethods: {
        associate: function(models) {
          Subject.hasMany(models.Topic, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Subject;
};



// {
//       classMethods: {
//         // Associating Subjects with Topics
//           associate: function(models) {
//             // When an Subject is deleted, also delete any associated Topics
//             Subject.hasMany(models.Topic, {
//               onDelete: "cascade"
//             });
//           }
//       }
//     }