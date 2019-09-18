const errors = (req,res,next) => {
    if (typeof req.session.errors !== 'undefined' && req.session.errors.length >0){
        res.locals.errors = req.session.errors;
    }
    req.session.errors = []; // efface l'erreur pour éviter de rester dans la condition
    next();//permet de passer au middleware suivant et eviter de bloque le chargement de la page
};

module.exports = errors;