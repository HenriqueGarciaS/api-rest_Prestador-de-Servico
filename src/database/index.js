const Sequelize = require('sequelize');
const dbConfig = require('../config/database');


const Usuario = require('../models/Usuario')
const Anuncio = require('../models/Anuncio');
const Chat = require('../models/Chat');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Anuncio.init(connection);
Chat.init(connection);
Anuncio.associate(connection.models);
Chat.associate(connection.models);


module.exports = connection;