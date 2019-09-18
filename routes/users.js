const express = require ('express');
const router = express.Router();
const upload = require('../upload');

router.post('/new',upload.single('avatar'),(req,res) => {
    console.log(req.file);
    if (req.body.firstname  ===''){
        req.session.errors.push({
            type:'danger',
            message:'Veuillez renseigner le prénom !'
        });
    }
    if (req.body.lastname  ===''){
        req.session.errors.push({
            type:'danger',
            message:'Veuillez renseigner le nom !'
        });
    }
    res.render('index',{
        username: req.body.firstname + ' ' + req.body.lastname,
        image: req.file
    });
});

module.exports = router;