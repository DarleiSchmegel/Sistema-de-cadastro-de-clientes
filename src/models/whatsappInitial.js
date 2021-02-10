// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
// venom.create(
//     'Boot do Darlei', //Pass the name of the client you want to start the bot
//   )
//   .then((client) => start(client))
//   .catch((error) => console.log(error));


(async()=>{
    await venom.create()
    .then((client) => start(client))
    .catch((error) => console.log(error));

    function start(client) {
        client.onMessage((message) => {
          if (message.body === 'Bot' && message.isGroupMsg === false) {
            client
              .sendText(message.from, 'Olá! Eu sou um robo feito pelo Darlei, aguarde o retorno dele.')
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });
          }
        });
    }
  })();

module.exports = venom;