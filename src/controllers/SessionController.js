// index, show, store, update, destroy


const User = require('../models/User');

module.exports = {
    store(req, res) {//para registrar um novo usuário
        return res.json(req.query)
    },
    show(req, res) {//para listar um usuário
        return res.json(req.params)
    },
    async index(req, res) {//para listar um usuário
        try {
            console.log(req)
            console.log('Listando');
            const data = await User.find({});
            res.status(200).send(data);
          } catch (e) {
            res.status(500).send({message: 'Falha ao carregar Inscritos.'});
          
        };
    }

};