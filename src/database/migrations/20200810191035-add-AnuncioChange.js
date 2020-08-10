'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Anuncio","classificacao","pontuacao");
  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.renameColumn("Anuncio","pontuacao","classificacao");
  }
};
