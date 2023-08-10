const typePokemon = require("../controllers/typesControllers")

const  getTypesHandlers = async (req, res) => {
try {
    const typesPokemons= await typePokemon()
    
    res.status(200).json(typesPokemons)

} catch (error) {
    res.status(500).json({error:error.message})
}

}

module.exports = getTypesHandlers