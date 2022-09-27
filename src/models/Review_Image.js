module.exports = (sequelize, DataTypes) => {
  const Review_Image = sequelize.define(
    'Review_Image', 
    {
      image: {
        type: DataTypes.STRING
      },
    },  
    { underscored: true}
  );

  return Review_Image;
}


