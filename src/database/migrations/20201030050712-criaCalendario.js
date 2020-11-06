'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('agenda',{
      id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
      },

      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'Usuario',
          key: 'id'
        },
        onUpdate:'Cascade',
        onDelete: 'Cascade'
      },

      id_anuncio: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'Anuncio',
          ley: 'id'
        },
        onUpdate: 'Cascade',
        onDelete : 'Cascade'
      },

      data: {
        type: Sequelize.STRING,
        allowNull:false
      },

      nome_anuncio:{
        type:Sequelize.STRING,
        allowNull:false
      }
    });
   
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('agenda');
  }
};
