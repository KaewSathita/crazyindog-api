module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments', 
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    },  
    { underscored: true}
  );

  return Comments;
}




