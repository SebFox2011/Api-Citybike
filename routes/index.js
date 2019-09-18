const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // definit la route / en GET ou POST
    const db = req.app.locals.db;
    //console.log(process.env.DBNAME);
    db.collection('stations').find().toArray((err, stations) => {
        //console.log(stations);
        res.render('index', {
            username: 'sphilippe',
            stations:stations
        });
    });
});

module.exports = router;