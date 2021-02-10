require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const routes = require('./routes');
//const venom = require('./models/whatsappInitial');

mongoose.set('useCreateIndex', true);//tive que usar para tirar um warning

mongoose.connect(process.env.MONGODB_ACCESS_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true //necessario para tirar warning
});

//*
const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT);