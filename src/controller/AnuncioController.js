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

        const prestador =  await Prestador.findByPk(id_prestador);

        if(!prestador)
        return res.status(400).json({error:"Prestador não encontrado"});

         const anuncio =  await  Anuncio.create({cidade,
        descricao,
        horarios,
        valor,
        id_prestador
    })

        return res.json(anuncio);

    },

    async update(req,res){
        const{id_anuncio} = req.params;
        const{cidade,descricao,horarios,valor} = req.body;

        const anuncio = await Anuncio.findByPk(id_anuncio);
        
        if(!anuncio)
        return res.status(400).json({error:"Anuncio não encontrado"});

        anuncio.cidade = cidade;
        anuncio.descricao = descricao;
        anuncio.horarios = horarios;
        anuncio.valor = valor;

        await anuncio.save();
        return res.json(anuncio);

    },

    async delete(req,res){
         const {id_anuncio} = req.params

         const anuncio = await Anuncio.findByPk(id_anuncio);

         await anuncio.destroy();

         return res.json(anuncio);
    }
}