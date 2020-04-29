const  express = require('express');

const UsuarioController = require('./controller/UsuarioController');
const AnuncioController = require('./controller/AnuncioController');
const ChatController = require('./controller/ChatController');

const routes = express.Router();

routes.get('/',(req,res) =>{
    return res.json({text: "hello world"});
})

routes.get('/usuarios',UsuarioController.index);
routes.get('/usuario/:id_usuario',UsuarioController.FindOne);
routes.get('/anuncio/:id_usuario',AnuncioController.index);
routes.get('/chat/:id_usuario',ChatController.findOne);

routes.post('/gravarChat',ChatController.store);
routes.post('/loginUsuario',UsuarioController.login);
routes.post('/usuario',UsuarioController.store);
routes.post('/fazeranuncio/:id_usuario',AnuncioController.store);
routes.post('/deletarUsuario/:id_usuario',UsuarioController.delete);
routes.post('/deletarAnuncio/:id_anuncio',AnuncioController.delete);
routes.post('/updateUsuario/:id_usuario',UsuarioController.updateUsuario);
routes.post('/updateAnuncio/:id_anuncio',AnuncioController.update);

module.exports = routes;