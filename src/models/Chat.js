const {Model, DataTypes} = require('sequelize');

class Chat extends Model{
    static init(connection){
        super.init({
            mensagens: DataTypes.STRING,
            nome: DataTypes.STRING
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

module.exports = Chat;