'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Anuncio','usuario',{
      type:Sequelize.DataTypes.STRING,
      allowNull:false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Anuncio','usuario');
  }
};