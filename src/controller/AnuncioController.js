const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');

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
        const {cidade,descricao,horarios,valor,imagem} = req.body;
        const classificacao = '0';
        const usuario =  await Usuario.findByPk(id_usuario);

        if(!usuario)
        return res.status(400).json({error:"Usuário não encontrado"});

         const anuncio = await Anuncio.create({cidade,
            descricao,
            horarios,
            valor,
            imagem,
            classificacao,
            id_usuario});

        return res.json(anuncio);

    },

    async update(req,res){
        const{id_anuncio} = req.params;
        const{cidade,descricao,horarios,valor,imagem} = req.body;

        const anuncio = await Anuncio.findByPk(id_anuncio);
        
        if(!anuncio)
        return res.status(400).json({error:"Anuncio não encontrado"});

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

        anuncio.classificacao = classificacao;

        await anuncio.save();

        res.json(anuncio);
    },

    async delete(req,res){
         const {id_anuncio} = req.params

         const anuncio = await Anuncio.findByPk(id_anuncio);
        
         if(!anuncio)
         res.status(400).json({error:"Anuncio não encontrado"});

         await anuncio.destroy();

         return res.json(anuncio);
    }
}