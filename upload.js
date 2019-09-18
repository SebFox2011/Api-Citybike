const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {// prend le fichier uploadé et appele la fonction cb
        console.log(file);
        const fileinfo = path.parse(file.originalname);
        cb(null, fileinfo.name + '-' + Date.now() + fileinfo.ext);// ajoute date actuelle dans le fichier
    }
});
const upload = multer({ storage: storage }); // Parser multipart/form-data

module.exports =  upload;