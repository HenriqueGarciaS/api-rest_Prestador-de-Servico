'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('anuncio','visualizacao',{
      type:Sequelize.DataTypes.INTEGER,
      allowNull:false
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('anuncio','visualizacao');
  }
};
