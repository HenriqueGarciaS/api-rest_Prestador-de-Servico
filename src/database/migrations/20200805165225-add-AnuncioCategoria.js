'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.addColumn("Anuncio","categoria",{
    type:Sequelize.STRING,
    allowNull:false
  });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Anuncio","Categoria");
  }
};
