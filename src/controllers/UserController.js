
const jwt = require('jsonwebtoken');//usando comando yarn add jsonwebtoken

const whatsappSession = require('../models/whatsappSession')
const WhatsappSession = require('../models/whatsappSession')
//const venom = require('venom-bot');
//import { creat, Whatsapp } from 'venom-bot';

function generateTokenSecundary(params = {}) {
    return token = jwt.sign(params, process.env.AUTH_CONFIG_SECRET_UNIVERSAL, { //
        expiresIn: 3600,
    });
};

const User = require('../models/User');
const MyToken = require('../models/Token')

module.exports = {
    async store(req, res){ //register
        //console.log(req.body);
        const { username, email } = req.body;
        const tokenForRegistration = req.userID;
        console.log("Entrou",username)
        
        try {
            const tokenExist = await MyToken.findOne({ _id: tokenForRegistration })
            if(!tokenExist){
                return res.status(400).send({ error: 'Erro of Token for registration'});
            }
            if(tokenExist.used){
                return res.status(400).send({ error: 'Token of regestration already used'});
            }
            

            if( await User.findOne({ username })){
                //console.log("User ja existe");
                return res.status(400).json({ message: 'User already exists'});
            }
            if( await User.findOne({ email })){
                //console.log("Email ja existe");
                return res.status(400).json({ message: 'email already exists'});
            }
            tokenExist.used = true;
            await tokenExist.save();

            const user = await User.create(req.body);
            //console.log(req.body);
            user.password = undefined;//serve para ocultar senha quando mandar os dados do usuário

            
            //return res.send({ petiano });
            return res.json({
                user,
                token: generateTokenSecundary({ id: user.id})
            });
        }catch (err) {
            console.log(err)
            return res.status(400).send({ error : 'Registration failed'});
        }
    },

    async index(req, res) {//para listar todos os usuários
        try {
            
            //console.log('Listando');
            const data = await User.find({});
            res.status(200).send(data);
          } catch (e) {
            res.status(500).send({message: 'Falha ao carregar Usuários.'});
          
        };
    },
    show(req,res) {
        //whatsappSession.show(req.query.name)
    }

}