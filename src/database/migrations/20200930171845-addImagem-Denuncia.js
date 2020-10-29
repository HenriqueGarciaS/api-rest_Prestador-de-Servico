'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn("denuncia","imagem",{
        type:Sequelize.STRING,
        allowNull:true
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("denuncia","imagem");
  }
};
