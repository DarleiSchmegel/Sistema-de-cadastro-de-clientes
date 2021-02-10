const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');//usando comando yarn add jsonwebtoken

function generateTokenPrimary(params = {}) {
    return token = jwt.sign(params, process.env.AUTH_CONFIG_SECRET_UNIVERSAL, { //
        expiresIn: 600,
    });
};
function generateTokenSecundary(params = {}) {
    return token = jwt.sign(params, process.env.AUTH_CONFIG_SECRET_UNIVERSAL, { //
        expiresIn: 3600,
    });
};



const MyToken = require('../models/Token');
const User = require('../models/User');

module.exports = {
    async authenticatePrimary(req, res) {
        const { value } = req.body;

        const valueExist = await MyToken.findOne({ value })
        //console.log(valueExist)
        if(!valueExist){
            return res.status(400).send({ error: 'Token of regestration not found'});
        }

        //console.log(valueExist.used)
        if(valueExist.used){
            return res.status(400).send({ error: 'Token of regestration already used'});
        }
        // valueExist.used = true;
        // await valueExist.save();
        //console.log("AuthController value.id",valueExist.id)
        return res.json( { 
            token: generateTokenPrimary({ id: valueExist.id })
        });
    },
    async authenticateSecundary(req, res) {//login do usuário
        const { email, password } = req.body;
        //console.log(req.body.username);
        const userExists = await User.findOne( { email }).select('+password');//retorna o petiano se ele existir juntamente com a senha relacioana a ele
        //const petianoExists = await Petiano.findOne({username : req.params.username});
        //console.log(petianoExists);
        if(!userExists){
            return res.status(400).send({ error: 'User not found'});
        }

        if(!await bcrypt.compare(password, userExists.password)){
            return res.status(400).send({ error: 'Invalid password'});
        }
        userExists.password = undefined;

        return res.json( {
            userExists , 
            token: generateTokenSecundary({ id: userExists.id }) 
        });
    },
    

}