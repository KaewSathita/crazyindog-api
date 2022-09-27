module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    'Reviews', 
    {
      PosterImage: {
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

  return Reviews;
}