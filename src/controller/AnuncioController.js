const Anuncio = require('../models/Anuncio');
const Prestador = require('../models/Prestador');

module.exports = {
    

    async index(req,res){
        const {id_prestador} = req.params;

        const prestador = await Prestador.findByPk(id_prestador);

        if(!prestador)
        return res.status(400).json({error:"Prestador não encontrado"});

        const anuncio = await Anuncio.findAll({where:{ id_prestador: id_prestador}});
        return res.json({prestador,anuncio});

    },

    async store(req,res) {
        const {id_prestador} = req.params;
        const {cidade,descricao,horarios,valor} = req.body;

        const prestador = await Prestador.findByPk(id_prestador);

        if(!prestador)
        return res.status(400).json({error:"Prestador não encontrado"});

         const anuncio = await Anuncio.create({cidade,
        descricao,
        horarios,
        valor,
        id_prestador
    })

        return res.json(anuncio);

    }
}