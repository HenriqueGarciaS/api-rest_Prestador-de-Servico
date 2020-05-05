'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('Denuncia', { 
        id: {
          type:Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false 
        },

        id_contrante:{
          type : Sequelize.INTEGER,
          allowNull: false,
          references:{
            model: 'Usuario',
            key:"id"
          }
        },

        id_anuncio:{
          type : Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:'Anuncio',
            key:'id'
          }
        },

        descricao:{
          type : Sequelize.STRING,
          allowNull: false,
        }


      });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Denuncia');
  }
};
