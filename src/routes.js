const  express = require('express');

const PrestadorController = require('./controller/PrestadorController');
const AnuncioController = require('./controller/AnuncioController');

const routes = express.Router();

routes.get('/',(req,res) =>{
    return res.json({text: "hello world"});
})

routes.get('/prestadores',PrestadorController.index);
routes.get('/prestador/:id_prestador',PrestadorController.FindOne);
routes.get('/anuncio/:id_prestador',AnuncioController.index);



routes.post('/loginPrestador',PrestadorController.login);
routes.post('/prestador',PrestadorController.store);
routes.post('/fazeranuncio/:id_prestador',AnuncioController.store);
routes.post('/deletarPrestador/:id_prestador',PrestadorController.delete);
routes.post('/deletarAnuncio/:id_anuncio',AnuncioController.delete);
routes.post('/updatePrestador/:id_prestador',PrestadorController.updatePrestador);
routes.post('/updateAnuncio/:id_anuncio',AnuncioController.update);

module.exports = routes;