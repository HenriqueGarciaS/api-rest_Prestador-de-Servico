const Sequelize = require('sequelize');
const dbConfig = require('../config/database');


const Usuario = require('../models/Usuario')
const Anuncio = require('../models/Anuncio');
const Chat = require('../models/Chat');
const Denuncia = require('../models/Denuncia');
const Agenda = require ('../models/Agenda');
const UserAtivos = require('../models/UserAtivos');

const connection = new Sequelize(dbConfig);



Usuario.init(connection);
Anuncio.init(connection);
Chat.init(connection);
Denuncia.init(connection);
Agenda.init(connection);
UserAtivos.init(connection);
Anuncio.associate(connection.models);
Chat.associate(connection.models);
Denuncia.associate(connection.models);
Agenda.associate(connection.models);


module.exports = connection;