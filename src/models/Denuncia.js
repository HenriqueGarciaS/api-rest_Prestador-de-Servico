const { Model, DataTypes} = require('sequelize');

class Denuncia extends Model{
    static init(connection){
        super.init({
            descricao: DataTypes.STRING,
            imagem:DataTypes.STRING
        },{
            sequelize:connection
        })
    }
     
    static associate(models){
        this.belongsTo(models.Usuario,{foreignKey:"id_prestador"});
        this.belongsTo(models.Usuario,{foreignKey:"id_contrante"});
        this.belongsTo(models.Anuncio,{foreignKey:"id_anuncio"});
    }
  
}

module.exports = Denuncia;