'use strict';

const { sequelize } = require("../../models/Usuario");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('usuario','foto',{
      type:Sequelize.DataTypes.STRING,
      allowNull:true
    })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.removeColumn('usuario','foto');
  }
};
