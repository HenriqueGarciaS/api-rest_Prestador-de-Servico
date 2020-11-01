const  express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const UsuarioController = require('./controller/UsuarioController');
const AnuncioController = require('./controller/AnuncioController');
const ChatController = require('./controller/ChatController');
const DenunciaController = require('./controller/DenunciaController');
const AgendaController = require('./controller/AgendaController');
const routes = express.Router();

routes.get('/',(req,res) =>{
    return res.json({text: "hello world"});
})

routes.get('/usuarios',UsuarioController.index);
routes.get('/usuario/:id_usuario',UsuarioController.FindOne);
routes.get('/anuncio/:id_usuario',AnuncioController.index);
routes.get('/anuncios',AnuncioController.findAll);
routes.get('/chat/:nomeSala',ChatController.findOne);
routes.get('/todosChats/:id',ChatController.findChats);
routes.get('/denuncia/:id_usuario',DenunciaController.findDenuncia);
routes.get('/denunciaPrestador/:id_usuario',DenunciaController.findDenuncias);
routes.get('/verDenuncia/:id_denuncia',DenunciaController.index);
routes.get('/anuncioClassificao/:id_anuncio',AnuncioController.getClassificacao);
routes.get('/anuncioDetalhes/:id_anuncio',AnuncioController.indexOne);
routes.get('/anuncioCategoria/:categoria',AnuncioController.findBycategoria);
routes.get('/anunciosHistorico/:id_usuario',AnuncioController.findByhistorico);
routes.get('/agenda/:id_usuario',AgendaController.findCompromissos);
routes.get('/logout/:token',UsuarioController.logout);

routes.post('/criaCompromisso',AgendaController.store);
routes.post('/anuncioFiltros',AnuncioController.findByfiltros)
routes.post('/anuncioFiltro',AnuncioController.findByFiltrosSimples);
routes.post('/gravarChat',ChatController.store);
routes.post('/updateChat/:nomeSala',ChatController.updateChat);
routes.post('/loginUsuario',UsuarioController.login);
routes.post('/usuario',multer(multerConfig).single("file"),UsuarioController.store);
routes.post('/anuncioFavorito/:id_usuario',UsuarioController.updateFavoritos);
routes.post('/fazeranuncio/:id_usuario',multer(multerConfig).single("file"),AnuncioController.store);
routes.post('/fazerDenuncia/:id_anuncio',DenunciaController.store);
routes.post('/deletarUsuario/:id_usuario',UsuarioController.delete);
routes.post('/deletarAnuncio/:id_anuncio',AnuncioController.delete);
routes.post('/updateUsuario/:id_usuario',multer(multerConfig).single("file"),UsuarioController.updateUsuario);
routes.post('/updateAnuncio/:id_anuncio',multer(multerConfig).single("file"),AnuncioController.update);
routes.post('/updateUsuario/newHistorico/:id_usuario',UsuarioController.updateHistorico);
routes.post('/updateAnuncio/novaClassificacao/:id_anuncio',AnuncioController.newClassificacao);
routes.post('/updateDenuncia/:id_denuncia',DenunciaController.updateDenuncia);
routes.post('/deleteDenuncia/:id_denuncia',DenunciaController.deleteDenuncia);
routes.post('/imagem',multer(multerConfig).single("file"), (req,res) =>{
    return res.json(req.file.filename);
})
module.exports = routes;