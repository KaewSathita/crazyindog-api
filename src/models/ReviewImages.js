module.exports = (sequelize, DataTypes) => {
  const ReviewImages = sequelize.define(
    'ReviewImages', 
    {
      image: {
        type: DataTypes.STRING
      },
    },  
    { underscored: true}
    
  );

  ReviewImages.associate = db => {
    ReviewImages.belongsTo(db.Reviews, {
      foreignKey: {
        name: 'reviewId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return ReviewImages;
}


