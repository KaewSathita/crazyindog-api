module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    'Categories', 
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

  return Categories;
}