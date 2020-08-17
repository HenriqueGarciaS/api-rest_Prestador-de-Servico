'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Usuario','historico',{
     type:Sequelize.DataTypes.STRING,
     allowNull:false
   })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn("Usuario",'historico');
  }
};
