const express = require('express');

const AdminAuthControler = require('./controllers/AdminAuthController');
const AdminTokensController = require('./controllers/AdminTokensController');

const AuthController = require('./controllers/AuthController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');

const authMiddleware = require('./middleware/auth');
const authAdminMiddleware = require('./middleware/authAdmin');

const routes = express.Router();


const venom = require('venom-bot');
venom.create(
    'Boot do Darlei', //Pass the name of the client you want to start the bot
  )
  .then((client) => start(client))
  .catch((error) => console.log(error));


//GET, POST, PUT, DELETE

// req.query =  Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar vorpo da requisição (para criação, edição)


// const venom = require('./models/whatsappInitial')
//Área dos clientes
routes.post('/authenticatePrimary', AuthController.authenticatePrimary);

routes.post("/login", AuthController.authenticateSecundary);
routes.post("/register",authMiddleware, UserController.store);




//Área usada para lidar com tokens que serão usados pelos novos clientes

routes.post("/admin", AdminAuthControler.authAdmin);
routes.use(authAdminMiddleware)
routes.post("/admin/add-token", AdminTokensController.store);
routes.put("/admin/used-token", AdminTokensController.update);
routes.get("/admin/index-token", AdminTokensController.index);
routes.delete("/admin/delete-token", AdminTokensController.destroy);

//Área usada para lidar com os clienetes cadastrados
routes.get("/admin/index-user", UserController.index);
routes.get("/admin/show-user", UserController.show);
//routes.get("/loged/:user", SessionController.show);

routes.get("/", (req, res) => {
    res.status(200).send({
        title: 'chatBoot',
        version: '1.0.0'
    });
});
module.exports = routes;