//Sessão onde vou criar tokens para usuários se registrarem no sistema
const MyToken = require('../models/Token');

module.exports = {
    async store(req, res){
        //console.log(req.body);
        const { value } = req.body;
        try {
            

            if( await MyToken.findOne({ value })){
                console.log("Token ja existe");
                return res.status(400).json({ message: 'Token already exists'});
            }

            const token = await MyToken.create(req.body);

            return res.json({
                token,
            });
        }catch (err) {
            //console.log(err)
            return res.status(400).send({ error : 'Registration token failed'});
        }
    },
    async update(req, res) {
        const { value } = req.body;
        try {
            //console.log(req.body)
            const valueExist = await MyToken.findOne({ value })
            if( valueExist ){
                valueExist.used = true;
                await valueExist.save();
                return res.status(200).json({ valueExist, permisão: "true" });
            }
            
        } catch (error) {
            return res.status(400).send({ error : 'Update token failed'});
        }
    },
    async index(req, res) {
        const { value } = req.body;
        try {
            //console.log(req.body)
            const tokens = await MyToken.find({})
            
            return res.status(200).json({ tokens });
            
            
        } catch (error) {
            return res.status(400).send({ error : 'index tokens failed'});
        }
    },
    async destroy(req, res) {
        try {
            const tokens = await MyToken.deleteMany();
            return res.status(200).json({ tokens });
        } catch (error) {
            
        }
    }

}