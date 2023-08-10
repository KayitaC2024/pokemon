//    getAllPokemons, -- trae todos  '/'
//     getPokemonId, -- params
//     getPokemonName, -- query
//     postPokemon -- body
const {getAllPokemons,getPokemonId,getPokemonName,postPokemon } = require('../controllers/pokemonControllers')

const getAllPokemonHandler = async (req, res)  => {

    try {
        const pokemons = await getAllPokemons()
        res.status(200).json(pokemons)

    } catch (error) {

        res.status(500).json({error:error.message})

    }
}

const getPokemonIDHandler = async (req, res)  => {
    try {
        const id= (req.params.idPokemon);
        const pokemonId= await getPokemonId(id)

        if (id) { //si me pasan un id filtro el que coincida con ese mismo
            // let pokemonsId = pokemonsTotal.filter((el) => el.id  == id);
            // console.log(pokemonsTotal.length);
        pokemonId
            ? res.status(200).json(pokemonId)
            : res.status(404).send("No se encontro el pokemon")
       }
    } catch (error) {
        res.status(500).json({error:error.message})

    }
}

const getPokemonNameHandler = async (req, res)  => {
    try {
        const {name}=req.query
        const pokemonName = await  getPokemonName(name.toLowerCase())
        
        res.status(200).json(pokemonName)

    } catch (error) {

        res.status(500).json({error:error.message})

    }
}


const postPokemonHandler = async (req, res)  => {
    try {
        
        const pokemon = req.body;
        pokemon.name=pokemon.name.toLowerCase()
    const newPokemon = await postPokemon(pokemon)
        res.status(200).json(newPokemon)

    } catch (error) {

        res.status(500).json({error:error.message})

    }

}
module.exports = {
    getAllPokemonHandler,
    getPokemonIDHandler,
    getPokemonNameHandler,
    postPokemonHandler 
}