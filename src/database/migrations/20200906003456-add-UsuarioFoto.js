'use strict';

const { sequelize } = require("../../models/Usuario");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('usuario','foto',{
      type:Sequelize.DataTypes.STRING,
      allowNull:true
    })
  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.removeColumn('usuario','foto');
  }
};
