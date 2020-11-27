const Denuncia = require('../models/Denuncia');
const UserAtivos = require('../models/UserAtivos');
const Usuario = require('../models/Usuario');
const Anuncio = require('../models/Anuncio');
const fs = require('fs');

module.exports = {


   async index(req,res){
      const {id_denuncia} = req.params;


      const denuncia = await Denuncia.findByPk(id_denuncia);

      if(!denuncia)
      return res.status(400).json({error:"Denuncia não encontrada"});

      return res.json(denuncia);


   },

   async findDenunciaById(req,res){

      const {id_anuncio} = req.params;

      const denuncias = await Denuncia.findAll({where:{id_anuncio:id_anuncio}});

      if(!denuncias)
      return res.status(400).json({error:"Anuncio não possui denuncia"});

      return res.json(denuncias);

   },

   async findDenuncia(req,res){
      const {id_usuario} = req.params;
      
      const denuncias = await Denuncia.findAll({where:{id_contrante:id_usuario}});

      if(!denuncias)
      return res.status(400).json({error:"Usuário não possui denuncias"});

      return res.json(denuncias);
   }, 

   async findDenuncias(req,res){
      const {id_usuario} = req.params;
      
      const denuncias = await Denuncia.findAll({where:{id_prestador:id_usuario}});

      if(!denuncias)
      return res.status(400).json({error:"Nenhum denuncia sobre os anuncios foram feitas"});

      return res.json(denuncias);
   },

   async store(req,res){
      const{id_anuncio} = req.params;
      const{id_contrante,id_prestador,descricao,tokenAuth,id_usuario} = req.body;
      let imagem;

      if(req.file)
      imagem = req.file.filename;
      else
      imagem = "";
      

      const anuncio = await Anuncio.findByPk(id_anuncio);

      UserAtivos.removeAttribute('id');

      if(!await UserAtivos.findOne({where:{id_usuario:id_usuario,token:tokenAuth}}))
       return res.status(400).json('usuário errado tentando alterar denuncia');

      if(!anuncio)
      return res.status(400).json({error:"Anuncio não encontrado"});

      const denuncia = await Denuncia.create({id_anuncio,id_prestador,id_contrante,descricao,imagem});

      return res.json(denuncia);
   },

   async updateDenuncia(req,res){
       const{id_denuncia} = req.params;
       const{descricao,tokenAuth,id_usuario} = req.body;
       let imagem;

        if(req.file)
        imagem = req.file.filename;
        else
        imagem = "";

       UserAtivos.removeAttribute('id');

       if(!await UserAtivos.findOne({where:{id_usuario:id_usuario,token:tokenAuth}}))
       return res.status(400).json('usuário errado tentando alterar denuncia');

       const denuncia = await Denuncia.findByPk(id_denuncia);

       if(!denuncia)
       res.status(400).json({error:"Denuncia não encontrada"});

       if(denuncia.imagem != "" && req.file)
       fs.unlinkSync('./src/images/'+denuncia.imagem);
       else
       imagem = denuncia.imagem;



       denuncia.descricao = descricao;
       denuncia.imagem = imagem;

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