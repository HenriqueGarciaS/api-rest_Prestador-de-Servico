const  Usuario = require('../models/Usuario');


module.exports = {

    async login(req,res){
         const {email,senha} = req.body;

        const usuario =  await Usuario.findOne({where:{email:email, senha:senha}});

        if(!usuario)
        return res.status(400).json({error: "Usuário não encontrado"});

        return res.json(usuario);
    },

    async index(req,res){
        const usuarios =  await Usuario.findAll();
        return res.json(usuarios);

    },

    async FindOne(req,res){
        const {id_usuario} = req.params;
        const usuario = await Usuario.findByPk(id_usuario);

        if(!usuario)
        return res.status(400).json({error:"Usuário não encontrado"});

        return res.json(usuario);
    },

    async delete(req,res){
        const {id_usuario} = req.params;
        const usuario = await Usuario.findByPk(id_usuario);

        if(!usuario)
            return res.status(400).json({error: "Usuário não encontrado"});

            await Usuario.destroy();
            return res.json(usuario);
        

    },

    async store(req,res) {
        const { nome, senha, telefone, estado, cidade, email} = req.body;
        const usuario = await Usuario.create({nome,senha,telefone,estado,cidade,email});
        return res.json(usuario);
    },

    async updateUsuario(req,res){
        const {id_usuario} = req.params;
        const {nome,senha,telefone,estado,cidade,email} = req.body;

        const usuario = await Usuario.findByPk(id_usuario);

        if(!usuario)
            return res.status(400).json({error: "Usuário não encontrado"});

            usuario.nome = nome;
            usuario.senha = senha;
            usuario.telefone = telefone;
            usuario.estado = estado;
            usuario.cidade = cidade;
            usuario.email = email;

            await usuario.save();

            return res.json(usuario);
    }
}