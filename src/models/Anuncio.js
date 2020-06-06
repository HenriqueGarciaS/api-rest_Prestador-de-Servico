const { Model, DataTypes } = require('sequelize');

class Anuncio extends Model{

    static init(connection){
        super.init({
           cidade: DataTypes.STRING,
           descricao: DataTypes.STRING,
           horarios: DataTypes.STRING,
           valor: DataTypes.STRING, 
           imagem: DataTypes.STRING,
           classificacao:DataTypes.DECIMAL,
           titulo: DataTypes.STRING,
           usuario: DataTypes.STRING,
           total: DataTypes.INTEGER
        },{
            sequelize : connection
        })
    }

    static associate(models){
       this.belongsTo(models.Usuario,{foreignKey:"id_usuario"});
    }

}

module.exports = Anuncio;