const { Model, DataTypes} = require('sequelize');


class Agenda extends Model {

   static init(connection){
       super.init({
           data: DataTypes.STRING,
           nome_anuncio:DataTypes.STRING,
           horario: DataTypes.STRING
       },{
           sequelize:connection
       })
   }

   static associate(models){
       this.belongsTo(models.Usuario,{foreignKey:"id_usuario"});
       this.belongsTo(models.Anuncio,{foreignKey:"id_anuncio"});
   }



}

module.exports = Agenda;