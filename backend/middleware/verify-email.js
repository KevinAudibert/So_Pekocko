const emailValidator = require('email-validator');

module.exports = (req, res, next) => {          
    if (!emailValidator.validate(req.body.email)) {       
        res.writeHead(400, `Format de l'adresse Mail incorrect`, {
            'content-type': 'application/json'
        });
        res.end(`Format de l'email incorrect`);
    } else {
        next();
    }
};