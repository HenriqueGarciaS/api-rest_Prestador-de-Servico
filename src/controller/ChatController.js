const Chat = require('../models/Chat');
const Usuario = require('../models/Usuario');
module.exports = {
    
    
    async findOne(req,res){
        const {Op} = require('sequelize');
        const{id_usuario} = req.params;
        const chat = await Chat.findOne({where:{[Op.or]:[{id_contrante:id_usuario},{id_prestador:id_usuario}]}})

        if(!chat)
        return res.status(400).json({error:"Mensagens não encontradas"});

        return res.json(chat);


    },


    async store(req,res){
        const{id_prestador,id_contrante,mensagens} = req.body;
        
        const prestador = await Usuario.findByPk(id_prestador);
        const contrante = await Usuario.findByPk(id_contrante);

        if(!contrante || !prestador)
        return res.status(400).json({error:"Usuários não foram encontrados"})
    
        const chat = await Chat.create({id_prestador,id_contrante,mensagens});

        return res.json(chat);
    },

    async updateChat(req,res){
        const{id_chat} = req.params;
        const{mensagens} = req.body;

        const chat = await Chat.findByPk(id_chat);

        if(!chat)
        return res.status(400).json({error:"chat não encontrado"});

        chat.mensagens = mensagens;
        
       await chat.save()

        return res.json(chat);

    }


 


}