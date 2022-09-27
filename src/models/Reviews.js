module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    'Reviews', 
    {
      posterImage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      views: {
        type: DataTypes.INTEGER
      },
      stars : {
        type: DataTypes.INTEGER
      }
      
      
    },  
    { underscored: true}
  );

  Reviews.associate = db => {
    Reviews.belongsTo(db.Users, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    Reviews.hasMany(db.Comments, {
      foreignKey: {
        name: 'reviewId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    Reviews.hasMany(db.ReviewImages, {
      foreignKey: {
        name: 'reviewId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    Reviews.belongsTo(db.Categories, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });


  }
  
  return Reviews;
}
