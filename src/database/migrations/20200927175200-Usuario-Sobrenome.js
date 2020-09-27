'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn("usuario","sobrenome",{
     type:Sequelize.DataTypes.STRING,
     allowNull:false
   });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('usuario','sobrenome');
  }
};
