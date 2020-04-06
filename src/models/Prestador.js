const { Model, DataTypes } = require('sequelize');

class Prestador extends Model{

    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            senha: DataTypes.STRING,
            telefone: DataTypes.STRING,
            estado: DataTypes.STRING,
            cidade: DataTypes.STRING,
            email: DataTypes.STRING, 
        },{
            sequelize : connection
        })
    }



}
module.exports = Prestador;