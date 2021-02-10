const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');//add para usar hash comando yarn add bcryptjs

const UserShema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true, 
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

UserShema.pre('save', async function(next)  {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = model('user',UserShema);