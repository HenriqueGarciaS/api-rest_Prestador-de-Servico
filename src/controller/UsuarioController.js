const  Usuario = require('../models/Usuario');


module.exports = {

    async login(req,res){
         const {email,senha} = req.body;

        const usuario =  await Usuario.findOne({where:{email:email, senha:senha}});

        if(!usuario)
        return res.status(400).json({error: "Usuário não encontrado"});

        return res.json({id:usuario.id});
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

            return res.json(usuario.nome);
    },


    async updateHistorico(req,res){
        const {id_usuario} = req.params;
        const {id_anuncio} = req.body;

        const usuario = await Usuario.findByPk(id_usuario);

        if(!usuario)
        return res.json("Não foi possivel atualizar o histórico do usuário");

        usuario.historico = usuario.historico + "," + id_anuncio;

        usuario.save();
        return res.json(usuario);
    },

    async updateFavoritos(req,res){
        const{id_usuario} = req.params;
        const {anuncio_favorito} = req.body;
        
        const usuario = await Usuario.findByPk(id_usuario);

        if(!usuario)
        return res.status(400).json({error: "usuario não encontrado"});
        
        if(usuario.anuncios_favoritos === null)
        usuario.anuncios_favoritos = anuncio_favorito;
        else
        usuario.anuncios_favoritos = usuario.anuncios_favoritos + "," + anuncio_favorito;
        
        await usuario.save();

        return res.json(usuario);



    } 
}