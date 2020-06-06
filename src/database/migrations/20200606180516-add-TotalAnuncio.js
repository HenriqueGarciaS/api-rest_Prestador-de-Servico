'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Anuncio","total",{
      type: Sequelize.INTEGER,
      allowNull:false
    });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn("Anuncio","total");
  }
};
