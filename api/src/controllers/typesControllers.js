const {Type} = require('../db')
const axios = require ('axios')


const typePokemon = async () => {
    let types = await Type.findAll()
    if (types.length) return types
    const apiTypes= await axios.get("https://pokeapi.co/api/v2/type")
    types = apiTypes.data.results.map(tipo => {return{name:tipo.name}} )
     types = await  Type.bulkCreate (types)
    return types
}

module.exports = typePokemon;