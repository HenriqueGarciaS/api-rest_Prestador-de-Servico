const { Model, DataTypes } = require('sequelize');

class Anuncio extends Model{

    static init(connection){
        super.init({
           cidade: DataTypes.STRING,
           descricao: DataTypes.STRING,
           horarios: DataTypes.STRING,
           valor: DataTypes.STRING, 
        },{
            sequelize : connection
        })
    }

    static associate(models){
       this.belongsTo(models.Prestador,{foreignKey:"id_prestador"});
    }

}

module.exports = Anuncio;