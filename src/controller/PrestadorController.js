const  Prestador = require('../models/Prestador');


module.exports = {

    async login(req,res){
         const {email,senha} = req.body;

        const prestador =  await Prestador.findOne({where:{email:email, senha:senha}});

        if(!prestador)
        return res.status(400).json({error: "Prestador não encontrado"});

        return res.json(prestador);
    },

    async index(req,res){
        const prestadores =  await Prestador.findAll();
        return res.json(prestadores);

    },

    async FindOne(req,res){
        const {id_prestador} = req.params;
        const prestador = await Prestador.findByPk(id_prestador);

        if(!prestador)
        return res.status(400).json({error:"Prestador não encontrado"});

        return res.json(prestador);
    },

    async delete(req,res){
        const {id_prestador} = req.params;
        const prestador = await Prestador.findByPk(id_prestador);

        if(!prestador)
            return res.status(400).json({error: "Prestador não encontrado"});

            await prestador.destroy();
            return res.json(prestador);
        

    },

    async store(req,res) {
        const { nome, senha, telefone, estado, cidade, email} = req.body;
        const prestador = await Prestador.create({nome,senha,telefone,estado,cidade,email});
        return res.json(prestador);
    },

    async updateName(req,res){
        const {id_prestador} = req.params;
        const {nome} = req.body;

        const prestador = await Prestador.findByPk(id_prestador);

        if(!prestador)
            return res.status(400).json({error: "Prestador não encontrado"});

            prestador.nome = nome;

            prestador.save({fields:['nome']});

            return res.json(prestador);
    }
}