module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define("Subject", {
  	field_name: {
  		type: DataTypes.STRING,
  		allowNull: true
  	},
    subject_name: {
      type: DataTypes.STRING,
     
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



