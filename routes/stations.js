const express = require ('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

// Créer une nouvelle station
router.post('/',(req,res)=>{
    const db =req.app.locals.db;
// créer une valeur par défaut :
// req.body.total_spaces=20;
    db.collection('stations').insertOne(req.body,(err) => res.redirect('/'));
    console.log(req.body);
});

// Récupérer toutes les stations
router.get('/',(req,res)=>{

});

// Récupérer toutes les stations autour d'un point
router.get('/near',(req,res) => {
    const db = req.app.locals.db;
    const {lat,lng } = req.query;

    db.collection('stations').find({
        geometry: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(lng), parseFloat(lat)]
                }
            }
        }
    }).limit(7).toArray((err,stations) => res.json(stations));
});

// Récupérer une station par son id
router.get('/:id',(req,res)=>{
    const db = req.app.locals.db;
    const id = req.params.id;

    db.collection('stations').findOne({_id:new ObjectID(id)}, (err,station) => {res.json(station)});
});

// Effacer une station
router.delete ('/:id', (req,res) =>{
    const db =req.app.locals.db;
    const id = req.params.id;
    db.collection('stations').deleteOne({_id: new ObjectId(id)},(err) => res.redirect('/'));
});

module.exports = router;