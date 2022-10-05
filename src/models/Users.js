module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users', 
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      penName: {
        type: DataTypes.STRING
        // allowNull: false,
        // validate: {
        //   notEmpty: true
        // }
      },
      petBreed: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilepicture: DataTypes.STRING,
    }, 
    { underscored: true}
  );

  Users.associate = db => {
    Users.hasMany(db.Reviews, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  
  
    Users.hasMany(db.Comments, {
      foreignKey: {
        name: 'creatorId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }
  return Users;
}