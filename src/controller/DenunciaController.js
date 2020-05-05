const Denuncia = require('../models/Denuncia');
const Usuario = require('../models/Usuario');
const Anuncio = require('../models/Anuncio');

module.exports = {

   async findDenuncia(req,res){
      const {id_usuario} = req.params;
      
      const denuncias = await Denuncia.findAll({where:{id_contrante:id_usuario}});

      if(!denuncias)
      return res.status(400).json({error:"Usuário não possui denuncias"});

      return res.json(denuncias);
   }, 

   async store(req,res){
      const{id_anuncio} = req.params;
      const{id_contrante,descricao} = req.body;

      const anuncio = await Anuncio.findByPk(id_anuncio);

      if(!anuncio)
      return res.status(400).json({error:"Anuncio não encontrado"});

      const denuncia = await Denuncia.create({id_anuncio,id_contrante,descricao});

      return res.json(denuncia);
   },

   async updateDenuncia(req,res){
       const{id_denuncia} = req.params;
       const{descricao} = req.body;

       const denuncia = await Denuncia.findByPk(id_denuncia);

       if(!denuncia)
       res.status(400).json({error:"Denuncia não encontrada"});

       denuncia.descricao = descricao;

       await denuncia.save();

       return res.json(denuncia);
   },

   async deleteDenuncia(req,res){
       const{id_denuncia} = req.params

       const denuncia = await Denuncia.findByPk(id_denuncia);

       if(!denuncia)
       res.status(400).json({error:"Denuncia não encontrada"});

       await denuncia.destroy();

       return res.json(denuncia);
   }



}