module.exports = {
    dialect :"mysql",
    host: "localhost",
    username: "root",
    password: "admin",
    database: "sqlnode",
    define:{
        timestamps:false,
        freezeTableName: true,
        underscored:true
    }
};