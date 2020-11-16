'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('agenda','horario',{
     type:Sequelize.DataTypes.STRING,
     allowNull:false
   })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('agenda','horario');
  }
};
