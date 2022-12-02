const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5'),
        allowNull: true,
    },
    duration: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'),
        allowNull: true,
    },
    season: {
        type: DataTypes.ENUM('Winter', 'Spring', 'Summer', 'Autumn'),
        allowNull: true,
    },
  }, { timestamps: false});
};
