const express = require('express');
const routes = express.Router();
const pokedex = require('./controllers/pokedex');

routes.get('/:offset', pokedex.getPokemons);
routes.get('/pokemon/:pokemon', pokedex.getPokemon);

module.exports = routes;