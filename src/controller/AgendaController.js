const Agenda = require ('../models/Agenda');
const UserAtivos = require('../models/UserAtivos');



module.exports = {

    async store(req,res){

        const {id_usuario,id_anuncio,data,nome_anuncio,horario,tokenAuth} = req.body;

        UserAtivos.removeAttribute('id');

        if(!await UserAtivos.findOne({where:{ token:tokenAuth, id_usuario:id_usuario }}))
        return res.status(400).json('usuario errado tentando escrever no banco');

        if(await Agenda.findOne({where:{data:data,horario:horario,id_usuario:id_usuario,id_anuncio:id_anuncio}}))
        return res.json('horario já em uso');

       const agenda = await Agenda.create({
            id_usuario,
            id_anuncio,
            data,
            horario,
            nome_anuncio
       });

       
       return res.json(agenda);

    },


    async findCompromissos(req,res){
        const {id_usuario} = req.params;

        const agenda = await Agenda.findAll({
            where: {
                id_usuario : id_usuario
            }
        });

        if(!agenda)
        return res.json("não foram encontrados nenhum compromisso na agenda do usuário");

        return res.json(agenda);


    }






}