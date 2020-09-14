const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: './src/images/',
    storage: multer.diskStorage({
        destination:(req,file,cb) =>{
            cb(null,'./src/images/')
        },
        filename: (req,file,cb) =>{
                   crypto.randomBytes(16,(err, hash) =>{
                       if(err) cb(err);

                       const fileName = `${hash.toString('hex')}-${file.originalname}`
                       cb(null,fileName);
                   });
        }

    }),
    
    limits:{
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) =>{
        const alloweMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if(alloweMimes.includes(file.mimetype))
            cb(null,true);
        else
        cb(new Error("Invalid file type"));
        


    }

}