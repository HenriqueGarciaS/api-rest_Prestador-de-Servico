'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.changeColumn('chat','mensagens',{
     type:Sequelize.DataTypes.TEXT,
     allowNull:false,
   })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('chat','mensagens');
  }
};
