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

  Categories.associate = db => {
    Categories.hasMany(db.Reviews, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return Categories;
}