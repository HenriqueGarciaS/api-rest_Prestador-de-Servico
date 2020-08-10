const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');
const multer = require('multer');
const multerconfig = require('../config/multer');
const fs = require('fs');
const { sequelize } = require('../models/Anuncio');

module.exports = {
    

    async findAll(req,res){


        const anuncio = await Anuncio.findAll();

        if(!anuncio)
        return res.status(400).json({error:"Nenhum anuncio registrado"});

        return res.json(anuncio);


    },

    async findByfiltros(req,res){
       const {cidade,valor,classificacao,categoria} = req.body;
       const {Op, Sequelize} = require('sequelize')
       console.log(cidade);
       const anuncio = await Anuncio.findAll({where:{
        cidade:{[Op.like]:"%"+cidade+"%"},
        valor:{[Op.like]:"%"+valor+"%"},
        classificacao:{[Op.like]:"%"+classificacao+"%"},
        categoria:{[Op.like]:"%"+categoria+"%"}
       } 
       });
       if(!anuncio)
       return res.status(400).json("Anuncios não encontrados");

       return res.json(anuncio);

    },

    async findBycategoria(req,res){
       const {categoria} = req.params;
       const {Op, where} = require("sequelize");
       const anuncio = await Anuncio.findAll({ where:{categoria:{[Op.like]:"%"+categoria+"%"}}});

       if(!anuncio)
       return res.status(400).json("Anuncios não encontrados");

       return res.json(anuncio);

    },

    async indexOne(req,res){
        const {id_anuncio} = req.params;
        const anuncio = await Anuncio.findByPk(id_anuncio);

        if(!anuncio)
        return res.status(400).json("Anuncio não encontrado");
        else
        return res.json(anuncio);
    },

    async index(req,res){
        const {id_usuario} = req.params;

        const usuario = await Usuario.findByPk(id_usuario);

        if(!usuario)
        return res.status(400).json({error:"Usuario não encontrado"});

        const anuncio = await Anuncio.findAll({where:{ id_usuario: id_usuario}});
        return res.json(anuncio);

    },

    async store(req,res) {
        
        const {id_usuario} = req.params;
        const {cidade,descricao,horarios,valor,titulo,categoria} = req.body;
        let classificacao = 0;
        let total = 0;
        let pontuacao = 0;
        let imagem;

        if(req.file)
        imagem = req.file.filename;
        else
        imagem = "No-image.png";

        const usuario = await Usuario.findByPk(id_usuario);
        
        if(!usuario)
        return res.status(400).json({error:"Usuário não encontrado"});

        const nome = usuario.nome;

        const anuncio = await Anuncio.create({
            cidade,
            descricao,
            horarios,
            valor,
            imagem,
            classificacao,
            titulo,
            usuario:nome,
            total,
            categoria,
            pontuacao,
            id_usuario
        });

        return res.json(anuncio);
    

    },
    
    async update(req,res){
        const{id_anuncio} = req.params;
        const{cidade,descricao,horarios,valor,titulo,categoria} = req.body;
        let imagem;

        if(req.file)
        imagem = req.file.filename;
        else
        imagem = "";
        

        const anuncio = await Anuncio.findByPk(id_anuncio);
        
        if(!anuncio)
        return res.status(400).json({error:"Anuncio não encontrado"});
        
        if(anuncio.imagem != "" && imagem != "")
        fs.unlinkSync('./src/images/'+anuncio.imagem);
        else
        imagem = anuncio.imagem;


        anuncio.cidade = cidade;
        anuncio.descricao = descricao;
        anuncio.horarios = horarios;
        anuncio.valor = valor;
        anuncio.imagem = imagem;
        anuncio.titulo = titulo;
        anuncio.categoria = categoria;

        await anuncio.save();
        return res.json(anuncio);

    },

    async newClassificacao(req,res){
        const {id_anuncio} = req.params;
        const {classificacao} = req.body;

        const anuncio = await Anuncio.findByPk(id_anuncio);

        if(!anuncio)
        res.status(400).json({error:"Anuncio não encontrado"});

       anuncio.total = anuncio.total + 1;
       anuncio.pontuacao = (anuncio.pontuacao + classificacao);
       await anuncio.save();
       anuncio.classificacao = anuncio.pontuacao/anuncio.total;
       anuncio.save();

        res.json({classificacao:classificacao});
    },

    async getClassificacao(req,res){
        const {id_anuncio} = req.params;

        const anuncio = await Anuncio.findByPk(id_anuncio);

        if(!anuncio)
        res.status(400).json({error:"Anuncio não encontrado"});

        return res.json({classificacao:anuncio.classificao});
    },

    async delete(req,res){
         const {id_anuncio} = req.params

         const anuncio = await Anuncio.findByPk(id_anuncio);
        
         if(!anuncio)
         res.status(400).json({error:"Anuncio não encontrado"});
         
         if(anuncio.imagem != "" || anuncio.imagem != "No-image.png")
         fs.unlinkSync('./src/images/'+anuncio.imagem);

         await anuncio.destroy();

         return res.json(anuncio);
    }

    
}