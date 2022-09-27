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

  Comments.associate = db => {
    Comments.belongsTo(db.Users, {
      foreignKey: {
        name: 'creatorId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    Comments.belongsTo(db.Reviews, {
      foreignKey: {
        name: 'reviewId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });




  }
  return Comments;
}




