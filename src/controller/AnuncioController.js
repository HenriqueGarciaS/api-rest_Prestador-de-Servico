const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');
const multer = require('multer');
const multerconfig = require('../config/multer');
const fs = require('fs');

module.exports = {
    

    async findAll(req,res){


        const anuncio = await Anuncio.findAll();

        if(!anuncio)
        return res.status(400).json({error:"Nenhum anuncio registrado"});

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
        const {cidade,descricao,horarios,valor,titulo} = req.body;
        let classificacao = 0;
        let imagem;

        if(req.file)
        imagem = req.file.filename;
        else
        imagem = "";

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
            id_usuario
        });

        return res.json(anuncio);
    

    },
    
    async update(req,res){
        const{id_anuncio} = req.params;
        const{cidade,descricao,horarios,valor} = req.body;
        let imagem;

        if(req.file)
        imagem = req.file.filename;
        else
        imagem = "";



        const anuncio = await Anuncio.findByPk(id_anuncio);
        
        if(!anuncio)
        return res.status(400).json({error:"Anuncio não encontrado"});
        
        if(anuncio.imagem != "")
        fs.unlinkSync('./src/images/'+anuncio.imagem);

        anuncio.cidade = cidade;
        anuncio.descricao = descricao;
        anuncio.horarios = horarios;
        anuncio.valor = valor;
        anuncio.imagem = imagem;

        await anuncio.save();
        return res.json(anuncio);

    },

    async newClassificacao(req,res){
        const {id_anuncio} = req.params;
        const {classificacao} = req.body;

        const anuncio = await Anuncio.findByPk(id_anuncio);

        if(!anuncio)
        res.status(400).json({error:"Anuncio não encontrado"});

        anuncio.classificacao = classificacao + anuncio.classificacao;

        await anuncio.save();

        res.json(anuncio);
    },

    async delete(req,res){
         const {id_anuncio} = req.params

         const anuncio = await Anuncio.findByPk(id_anuncio);
        
         if(!anuncio)
         res.status(400).json({error:"Anuncio não encontrado"});
         
         if(anuncio.imagem != "")
         fs.unlinkSync('./src/images/'+anuncio.imagem);

         await anuncio.destroy();

         return res.json(anuncio);
    }
}