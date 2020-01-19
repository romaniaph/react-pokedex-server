const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

module.exports = {
    async getPokemons(req, res) {
        try {
            const { offset } = req.params;

            //variável onde vão ficar armazenado os pokémons
            let pokemons = []

            //array de nomes que serão responsáveis pela coleta de outras informações (numero na pokedex e imagem)
            const response = await P.getPokemonsList({ limit: 20, offset })
                .then((response) => (response.results))

            //for para preencher o array de pokémons
            for (i in response) {
                const info = await P.getPokemonByName(response[i].name);
                pokemons.push({
                    name: response[i].name,
                    image: info.sprites.front_default,
                    id: info.id
                });
            }

            //retorno do array de pokémons
            return res.json(pokemons);
        }
        catch (err) {
            console.log(err);
        }
    },

    async getPokemon(req, res) {
        try {
            let { pokemon } = req.params;
            let types = [];
            let abilities = [];
            let games = [];
            let moves = [];

            pokemon = await P.getPokemonByName(pokemon.toLowerCase())
                .then((response) => (response))
                .catch((err) => (null))

            if (pokemon != null) {
                for (i in pokemon.abilities) {
                    const ability = pokemon.abilities[i].ability.name
                    abilities.push({ ability });
                }

                for (i in pokemon.types) {
                    const type = pokemon.types[i].type.name
                    types.push({ type });
                }

                for (i in pokemon.game_indices) {
                    const game = pokemon.game_indices[i].version.name;
                    games.push({ game })
                }

                for (i in pokemon.moves) {
                    let move = pokemon.moves[i].move.name;

                    moves.push({ move });
                }

                pokemon = {
                    id: pokemon.id,
                    name: pokemon.forms[0].name.toUpperCase(),
                    abilities: abilities,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    image: pokemon.sprites.front_default,
                    imageshiny: pokemon.sprites.front_shiny,
                    types,
                    games,
                    moves
                }
            }

            return res.json(pokemon);
        }
        catch (err) {
            console.log(err);
        }
    }
}