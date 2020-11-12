'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Chat',{
      id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull: false
      },

      id_prestador:{
          type:Sequelize.INTEGER,
          allowNull:false,
          references:{
            model: 'Usuario',
            key:"id"
          }
      },

      id_contrante:{
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model: 'Usuario',
        key:'id'
      }
    },

    id_anuncio:{
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:'Anuncio',
        key:'id'
      }
    },

    mensagens:{
       type:Sequelize.STRING,
       allowNull:true
    }


    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Chat');
  }
};
