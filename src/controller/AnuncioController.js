const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');
const UserAtvios = require('../models/UserAtivos');
const multer = require('multer');
const multerconfig = require('../config/multer');
const fs = require('fs');
const { sequelize } = require('../models/Anuncio');

module.exports = {
    

    async findAll(req,res){


        const anuncio = await Anuncio.findAll({
            order:[["id","DESC"]],
            limit : 4});

        if(!anuncio)
        return res.status(400).json({error:"Nenhum anuncio registrado"});

        return res.json(anuncio);


    },

    async findByFiltrosSimples(req,res){
        const {titulo,categoria} = req.body;
        const {Op,Sequelize} = require('sequelize');

       
        const anuncio = await Anuncio.findAll({
            where : {
                titulo: {[Op.like]:"%"+titulo+"%"},
                categoria:{[Op.like]:"%"+categoria+"%"},
            }
        });
      
      if(!anuncio)
        return res.status(400).json("nenhum anuncio encontrado com essas caractericas");

        return res.json(anuncio);
   
    
    },

    async findByfiltros(req,res){
       const {cidade,preco,avaliacao,categoria,titulo} = req.body;
       const {Op, Sequelize, where} = require('sequelize')
       console.log(cidade);
       const anuncio = await Anuncio.findAll({where:{
        cidade:{[Op.like]:"%"+cidade+"%"},
        valor:{[Op.gte]:preco},
        classificacao:{[Op.gte]:avaliacao},
        categoria:{[Op.like]:"%"+categoria+"%"},
        titulo: {[Op.like]: "%"+titulo+"%"}
       } 
       });
       if(!anuncio)
       return res.status(400).json("Anuncios não encontrados");

       return res.json(anuncio);

    },

    async getCidades(req,res){
        
        const anuncio = await Anuncio.findAll({
            attributes:['cidade'],
            
        });

        if(!anuncio)
        return res.status(400).json('cidades não encontradas');

        for(let i = 0; i < anuncio.length; i++)
        anuncio[i].cidade = anuncio[i].cidade.charAt(0).toUpperCase() + anuncio[i].cidade.slice(1);

        let cidades = [];

        for(let i = 0; i < anuncio.length; i++)
            if(!cidades.includes(anuncio[i].cidade))
            cidades.push(anuncio[i].cidade);
        

        return res.json(cidades);

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
        return res.status(400).json({ERROR:"Anuncio não Encontrado"});
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

    async findByhistorico(req,res){
        const{id_usuario} = req.params;
        const usuario = await Usuario.findByPk(id_usuario);
        const {Op} = require("sequelize");
        const sequelize = require("sequelize");
        
        if(!usuario)
        return res.status(400).json({error:"Não foi possivel recuperar historico"});

        let historico = usuario.historico.split(",");

        const anuncio = await Anuncio.findAll({
            where:{
                categoria : {[Op.in] : historico},
                
            },
            limit:4,
            order:[sequelize.fn("rand")]
        });

        if(!anuncio)
        return res.status(400).json({error:"Não foram encontrados anuncios que se encaixam com o historico"});

        return res.json(anuncio);
    },


    async store(req,res) {
        
        const {id_usuario} = req.params;
        const {cidade,descricao,horarios,valor,titulo,categoria,tokenAuth} = req.body;
        let classificacao = 0;
        let total = 0;
        let pontuacao = 0;
        let imagem;

        if(req.file)
        imagem = req.file.filename;
        else
        imagem = "";

        const usuario = await Usuario.findByPk(id_usuario);
        
        if(!usuario)
        return res.status(400).json({error:"Usuário não encontrado"});

        const nome = usuario.nome;

        UserAtvios.removeAttribute('id');

        
        if(!await UserAtvios.findOne({where:{id_usuario:id_usuario,token:tokenAuth}}))
        return res.status(400).json("usuário errado tentando registrar algo no banco");


        
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
            visualizacao:0,
            id_usuario
        });

        return res.json(anuncio);
    

    },
    
    async update(req,res){
        const{id_anuncio} = req.params;
        const{cidade,descricao,horarios,valor,titulo,categoria,tokenAuth,id_usuario} = req.body;
        let imagem;

        if(req.file)
        imagem = req.file.filename;
        else
        imagem = "";

        UserAtvios.removeAttribute('id');

        if(!await UserAtvios.findOne({where:{id_usuario:id_usuario,token:tokenAuth}}))
        return res.status(400).json("usuário errado tentando registrar algo no banco");
        

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

    async updateVisualizacao(req,res){

        const {id_anuncio} = req.params;

        const anuncio = await Anuncio.findByPk(id_anuncio);

        if(!anuncio)
        return res.status(400).json('anuncio não encontrado');

        anuncio.visualizacao = anuncio.visualizacao + 1;

        await anuncio.save();

        return res.json(anuncio);



    },

    async newClassificacao(req,res){
        const {id_anuncio} = req.params;
        const {nota} = req.body;

        const anuncio = await Anuncio.findByPk(id_anuncio);

        if(!anuncio)
        res.status(400).json({error:"Anuncio não encontrado"});

       anuncio.total = anuncio.total + 1;
       anuncio.pontuacao = (anuncio.pontuacao + nota);
       await anuncio.save();
       anuncio.classificacao = anuncio.pontuacao/anuncio.total;
       await anuncio.save();

        res.json({classificacao:nota});
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
    },

    async getEstatisticas(req,res){
        const {id_usuario} = req.params;

        const classificacao = await Anuncio.findAll(
            {
                where:{id_usuario:id_usuario},
                order:[["classificacao","DESC"]],
                limit:3
            });
        
        const visualizacao = await Anuncio.findAll({

            where:{id_usuario:id_usuario},
            order:[['visualizacao','DESC']],
            limit:3
        });


        if(!classificacao || !visualizacao)
        return res.status(400).json('falha ao recuperar estatisticas');

        return res.json({classificacao,visualizacao});
    }



    
}