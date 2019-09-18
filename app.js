const express = require('express');
const bodyParser = require('body-parser');

// Importation routes
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const stationsRoutes = require('./routes/stations');
/*
* Database
* */
const MongoClient = require('mongodb').MongoClient;

//
require('dotenv').config();
//
const app = express();
const session = require('express-session');

//Importation middleware custom
const errorUser = require('./middleware/errors');

app.locals.sitename = "Social Quizz";
app.locals.version = "1.0.0";

app.use(bodyParser.json()); // Parser application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parser application/x-www-form-urlencoded

app.set('view engine','pug'); // indique que pug est le moteur de rendu du projet
app.set('trust proxy',true);

//Middleware - pour que le server sache ou chercher le css
app.use('/public',express.static('public'));

//Sessions a charger avant les routes
app.use(session({
    secret:'dedzdzdzedezdz',
    resave:false,
    saveUninitialized:true
}));

// Middleware custom
app.use(errorUser);

//Routes
app.use(indexRoutes);
app.use('/user',usersRoutes);
app.use('/stations',stationsRoutes);

MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(client => {
        app.locals.db=client.db(process.env.DB_NAME);
        app.listen(8000);
    })
    .catch(err => console.log(err));
// server écoute sur le port 8000


