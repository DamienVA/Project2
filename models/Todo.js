module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 160] }
    },
    character: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Todo;
};
