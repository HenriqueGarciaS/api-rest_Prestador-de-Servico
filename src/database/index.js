const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Prestador = require('../models/Prestador');
const Anuncio = require('../models/Anuncio');

const connection = new Sequelize(dbConfig);

Prestador.init(connection);
Anuncio.init(connection);
Anuncio.associate(connection.models);



module.exports = connection;