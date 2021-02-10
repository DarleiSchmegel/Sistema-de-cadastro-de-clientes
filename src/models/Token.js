const { Schema, model } = require('mongoose');
// const bcrypt = require('bcryptjs');//add para usar hash comando yarn add bcryptjs

const TokenShema = new Schema({
    value:{
        type: String,
        unique: true,
        required: true,
       
    },
    used: {
        type: Boolean,
        required: true,
        defaut: false,
        //select: false,
    },
});

// UserShema.pre('save', async function(next)  {
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;

//     next();
// });

module.exports = model('token',TokenShema);