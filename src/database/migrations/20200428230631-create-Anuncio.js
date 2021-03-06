'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('Anuncio',
   {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }, 

    id_usuario:{
      type : Sequelize.INTEGER,
      allowNull:false,
      references:{
        model : 'Usuario', 
        key: "id"
      },
      onUpdate: 'Cascade',
      onDelete: 'Cascade'
    },

    cidade:{
      type:Sequelize.STRING,
      allowNull:false
    },

    descricao:{
      type:Sequelize.STRING,
      allowNull:false
    },

    horarios:{
      type:Sequelize.STRING,
      allowNull:false
    },

    valor:{
      type:Sequelize.DECIMAL(5,2),
      allowNull:false
    },

    imagem:{
      type:Sequelize.STRING,
    }


   })
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('Anuncio');
    
  }
};