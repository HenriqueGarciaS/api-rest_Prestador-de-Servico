'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('chat','nome',{
      type:Sequelize.DataTypes.STRING,
      allowNull:false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('chat','nome');
  }
};
