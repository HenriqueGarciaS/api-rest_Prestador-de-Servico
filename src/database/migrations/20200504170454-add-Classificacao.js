'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Anuncio','classificacao',
    {
      type: Sequelize.DataTypes.INTEGER,
      allowNull : false
    }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Anuncio','classificacao')
  }
};
