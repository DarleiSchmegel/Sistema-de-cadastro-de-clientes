const venom = require('venom-bot');
const { show } = require('../controllers/SessionController');

function start(client) {
    console.log(client.session);
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

module.exports = {
    async create(name){
        await venom
            .create(
                name,
                undefined,
                (statusSession, session) => {
                // return: isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
                console.log('Status Session: ', statusSession);
                // create session wss return "serverClose" case server for close
                console.log('Session name: ', session);
                },
                undefined
            )
            .then((client) => start(client))//console.log(client))
            .catch((error) => console.log(error));
    },
    show() {
        
    }

}