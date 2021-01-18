const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {          
    if (!passwordSchema.validate(req.body.password)) {       
        res.writeHead(400, '[Longueur minimun : 8] [Doit avoir au moins une majuscule] [Doit avoir au moins une minuscule] [Doit avoir au moins un chiffre] [Espaces non acceptés]', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};