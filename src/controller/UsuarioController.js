const  Usuario = require('../models/Usuario');
const UserAtivo = require('../models/UserAtivos');
const multer = require('multer');
const multerconfig = require('../config/multer');
const crypto = require('crypto');
const UserAtivos = require('../models/UserAtivos');




module.exports = {

    async login(req,res){
         const {email,senha} = req.body;

        const usuario =  await Usuario.findOne({where:{email:email, senha:senha}});

        if(!usuario)
        return res.status(400).json({error: "Usuário não encontrado"});

        UserAtivo.removeAttribute('id');

        const userAtivo = await UserAtivo.create({id_usuario:usuario.id,token:crypto.randomBytes(16).toString('hex')});

        return res.json({id:usuario.id,foto:usuario.foto,nome:(usuario.nome+" "+usuario.sobrenome),tokenAuth:userAtivo.token});
    },

    async logout(req,res){
        const {token} = req.params;

        const userAtivo = await UserAtivo.destroy({
            where:{
                id_usuario: token
            }
        });

        if(!userAtivo)
        return res.status(400).json('usuário não está ativo');

        return res.json('usuario não está mais ativo');
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
       });

       UserAtivo.removeAttribute('id');

       const userAtivo = await UserAtivo.create({id_usuario:usuario.id,token:crypto.randomBytes(16).toString('hex')});

       return res.json({id:usuario.id,foto:usuario.foto,nome:(usuario.nome+" "+usuario.sobrenome),tokenAuth:userAtivo.token});


    },

    async updateUsuario(req,res){
        const {id_usuario} = req.params;
        const {nome,sobrenome,senha,telefone,estado,cidade,email,tokenAuth} = req.body;
        let foto;


        const usuario = await Usuario.findByPk(id_usuario);

        UserAtivos.removeAttribute('id');

        
        if(!await UserAtivos.findOne({where:{id_usuario:id_usuario,token:tokenAuth}}))
        return res.status(400).json("usuário errado tentando registrar algo no banco");

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
        const {categoria} = req.body;

        console.log(id_usuario);

        console.log(categoria);

        const usuario = await Usuario.findByPk(id_usuario);

        if(!usuario)
        return res.json("Usuario não encontrado");
        
        if(usuario.historico == "")
        usuario.historico = categoria;
        if(usuario.historico != "" && !usuario.historico.includes(categoria))
        usuario.historico += ","+categoria;

        await usuario.save();

        return res.json({status:200});

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