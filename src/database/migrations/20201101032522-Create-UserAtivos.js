'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('userAtivos',{
     id_usuario:{
       type: Sequelize.STRING,
       allowNull:false
     },
     token:{
       type: Sequelize.STRING,
       allowNUll:false
     }
   })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('userAtivos');
  }
};
