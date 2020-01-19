const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

const App = express();

App.use(cors());
App.use(bodyparser.json());
App.use(bodyparser.urlencoded({ extended: false }));
App.listen('3000');

//rotas da api
App.use('/pokedex-api', routes);