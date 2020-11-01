const { Model, DataTypes} = require('sequelize');


class UserAtivos extends Model {

    static init(connection){
        super.init({
            id_usuario: DataTypes.STRING,
            token: DataTypes.STRING
        },{
            sequelize:connection
        })
     
    }


}

module.exports = UserAtivos;