const jwt = require('jsonwebtoken');
const authConfigSecret = process.env.AUTH_CONFIG_SECRET_UNIVERSAL;

module.exports = (req, res, next) => {
   // console.log("entrou");
    const authHeader = req.headers.authorization;
    //console.log(authHeader)
    if(!authHeader)
        return res.status(401).send({ error: 'no token provided'});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token error'});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: 'Token malformatted'});
    }
        
    jwt.verify(token, authConfigSecret, (err, decoded) =>{
        if(err) {
            console.log(err);
            return  res.status(401).send({ error: 'Token invalid',err});

        }
        req.userID = decoded.id;
        //console.log("auth: ",req.userID)
        return next();
    });
}