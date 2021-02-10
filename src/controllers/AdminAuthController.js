const jwt = require('jsonwebtoken');//usando comando yarn add jsonwebtoken
const authAdmin = require('../middleware/authAdmin');

function generateTokenSecundary(params = {}) {
    return token = jwt.sign(params, process.env.AUTH_ADMIN_SECRET, { //
        expiresIn: 3600,
    });
};

module.exports = {
    async authAdmin( req, res ) {
        const { name, password } = req.body;
        if( password !== process.env.AUTH_ADMIN_SECRET ){
            return res.status(400).send({ error: 'Invalid password'});
        }

        return res.json( {      
            token: generateTokenSecundary({ name: name }) 
        });

    }

}