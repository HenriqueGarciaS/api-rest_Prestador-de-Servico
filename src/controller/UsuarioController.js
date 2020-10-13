const  Usuario = require('../models/Usuario');
const multer = require('multer');
const multerconfig = require('../config/multer');



module.exports = {

    async login(req,res){
         const {email,senha} = req.body;

        const usuario =  await Usuario.findOne({where:{email:email, senha:senha}});

        if(!usuario)
        return res.status(400).json({error: "Usuário não encontrado"});

        return res.json({id:usuario.id,foto:usuario.foto,nome:(usuario.nome+" "+usuario.sobrenome)});
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
        usuario.senha = "";

        return res.json(usuario);
    },

    async delete(req,res){
        const {id_usuario} = req.params;
        const usuario = await Usuario.findByPk(id_usuario);

        if(!usuario)
            return res.status(400).json({error: "Usuário não encontrado"});

            usuario.removido = "1";
            await usuario.save();
            return res.json(usuario);
        

    },

    async store(req,res) {
        const{nome,sobrenome,senha,telefone,estado,cidade,email} = req.body;
        let foto;

       if(req.file)
       foto = req.file.filename;
       else
       foto = '';

       const usuario = await Usuario.create({
           nome,
           sobrenome,
           senha,
           telefone,
           estado,
           cidade,
           email,
           historico:"",
           removido:"",
           foto,
       })

       return res.json({id:usuario.id,foto:usuario.foto,nome:(usuario.nome+" "+usuario.sobrenome)});


    },

    async updateUsuario(req,res){
        const {id_usuario} = req.params;
        const {nome,sobrenome,senha,telefone,estado,cidade,email} = req.body;
        let foto;

        const usuario = await Usuario.findByPk(id_usuario);


        if(!usuario)
            return res.status(400).json({error: "Usuário não encontrado"});

            usuario.nome = nome;
            usuario.sobrenome = sobrenome;
            usuario.senha = senha;
            usuario.telefone = telefone;
            usuario.estado = estado;
            usuario.cidade = cidade;
            usuario.email = email;
            if(req.file)
            usuario.foto = req.file.filename;

            await usuario.save();

            return res.json({foto:usuario.foto,nome:(usuario.nome+" "+usuario.sobrenome)});
    },


    async updateHistorico(req,res){
        const {id_usuario} = req.params;
        const {id_anuncio} = req.body;

        const usuario = await Usuario.findByPk(id_usuario);

        if(!usuario)
        return res.json("Não foi possivel atualizar o histórico do usuário");

        usuario.historico = usuario.historico + "," + id_anuncio;

        await usuario.save();
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