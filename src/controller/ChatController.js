const Chat = require('../models/Chat');
const Usuario = require('../models/Usuario');
module.exports = {
    
    
    async findOne(req,res){
        const{nomeSala} = req.params;
        const chat = await Chat.findOne({where:{nome:nomeSala}});

        if(!chat)
        return res.status(400).json({error:"Mensagens não encontradas"});

        return res.json(chat.mensagens);
    },


    async store(req,res){
        const{id_prestador,id_contrante,nomeSala,mensagens} = req.body;
        
        const prestador = await Usuario.findByPk(id_prestador);
        const contrante = await Usuario.findByPk(id_contrante);

        if(!contrante || !prestador)
        return res.status(400).json({error:"Usuários não foram encontrados"})

        const sala = await Chat.findOne({where:{nome:nomeSala}});
        
        if(sala)
            return res.json({sala:"Sala já criada"})
        
        const chat = await Chat.create({id_prestador,id_contrante,mensagens,nome:nomeSala});
    
        return res.json({sala:chat.nome});
    },

    async updateChat(req,res){
        const{nomeSala} = req.params;
        const{mensagens} = req.body;

        const chat = await Chat.findOne({where:{nome:nomeSala}});

        if(!chat)
        return res.status(400).json({error:"chat não encontrado"});

        chat.mensagens = mensagens;
        
       await chat.save()

        return res.json(chat);

    }


 


}