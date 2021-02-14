const express = require('express');

const OngController = require('./controllers/OngController');
const CampanhaController = require('./controllers/CampanhasController');
const ProfileController = require('./controllers/ProfileController');
const SessionContoller = require('./controllers/SessionController');
const ItensFabricadosController = require('./controllers/ItensFabricadosController');

const InstituicoesController = require('./controllers/InstituicoesController');
const CountDoados = require('./controllers/CountDoados');
const ItensDoadosController = require('./controllers/ItensDoadosController');

const DoacoesRecebidas = require('./controllers/DoacoesRecebidas');
const AvaliarDoacoes = require('./controllers/AvaliarDoacoes');

//transacões
const Transactions = require('./controllers/Transactions');

const routes = express.Router();

//transações
routes.post('/transactions', Transactions.create);
routes.get('/transactions', Transactions.index);
routes.delete('/transactions', Transactions.delete);

routes.post('/cadItensDoados', ItensDoadosController.create);
routes.get('/cadItensDoados', ItensDoadosController.index);
routes.delete('/cadItensDoados', ItensDoadosController.delete);

routes.post('/doacoesRecebidas', DoacoesRecebidas.create);
routes.get('/doacoesRecebidas', DoacoesRecebidas.index);

routes.get('/avaliarDoacoes', AvaliarDoacoes.index);
routes.get('/avaliarDoacoesExat', AvaliarDoacoes.indexExat);
routes.post('/avaliarDoacoes', AvaliarDoacoes.create);
routes.delete('/avaliarDoacoes', AvaliarDoacoes.delete);

routes.post('/sessions', SessionContoller.create);
routes.post('/logar', SessionContoller.logar);

routes.get('/CountDoados', CountDoados.itensDoados);
routes.get('/CountCampanhas', CountDoados.campanhas);
routes.get('/CountCampanhasOng', CountDoados.campanhasOng);
routes.get('/CountRecebidas', CountDoados.doacoesRecebidas);
routes.get('/CountInstituicoes', CountDoados.instituicoes);

routes.get('/CountFabricados', CountDoados.itensFabricados);
routes.get('/CountAvaliacao', CountDoados.doacoesAvaliacao);

routes.post('/ongs', OngController.create);
routes.delete('/ongs', OngController.delete);
routes.get('/ongs', OngController.index);

routes.get('/instituicoes', InstituicoesController.index);
routes.post('/instituicoes', InstituicoesController.create);

routes.post('/itensFabricados', ItensFabricadosController.create);
routes.get('/itensFabricados', ItensFabricadosController.index);

routes.get('/profile', ProfileController.index);
routes.delete('/profile', ProfileController.delete);

routes.post('/campanhas', CampanhaController.create);
routes.get('/campanhas', CampanhaController.index);
routes.delete('/campanhas', CampanhaController.delete);



module.exports = routes;
