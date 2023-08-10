const { Pokemon, Type } = require("../db")
const axios = require('axios')

//getPokemonsApi() devuelve una promesa que se resuelve con un arreglo de objetos, donde cada objeto representa un Pokémon y contiene su información básica, como el nombre, la imagen, los tipos y las estadísticas.
const basicPokemons=  (result) => {
    return {
     
         id: result.id,//identificador numérico del Pokémon.
         name: result.name,// nombre del Pokémon.
         types: result.types.map((t) => t.type.name ),//arreglo de tipos de Pokémon, donde cada tipo es un string que indica el nombre del tipo 
         image: result.sprites.front_default,//URL de la imagen frontal del Pokémon.
         }
     
 }
// GET A LOS DATOS DE LA API 
const getPokemonsApi = async () => {
const resp = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=50")
.then((data) => {
    return data.data.results;// se extrae la propiedad data.results de los datos recibidos de la API y se devuelve como resultado.
})
.then((data) => {
return Promise.all(data.map((resp) => axios.get(resp.url)));//entrar a cada elemento y hacerle get a la url
})
.then((data) => {
    return data.map((resp) => resp.data);//resultado final de cada pokemon con todos sus datos,se guardan en resp
})

const arrayPokemon = resp.map((result) => { // dentro de un array me traigo todas las propiedades 
return basicPokemons(result)

});
return arrayPokemon
};

const getDbPokemons = async  () => {
try {

    const results = await Pokemon.findAll({

        include:{
            model: Type,
            attributes: ['name'],
            through:{
                attributes: [],
            }

        }
    })
    return results
} catch (error) {
    console.log(error);
}
}
// concatenación de los resultados 
const getAllPokemons= async ()  => {
    const apiInfo = await getPokemonsApi();

    const dbInfo = await  getDbPokemons();
 
    return  apiInfo.concat(dbInfo);


}

const detailsPokemons = async (result) => {
    return {
     
         id: result.id,//identificador numérico del Pokémon.
         name: result.name,// nombre del Pokémon.
         types: result.types.map((tipo) => tipo.type.name ),//arreglo de tipos de Pokémon, donde cada tipo es un string que indica el nombre del tipo 
         image: result.sprites.front_default,//URL de la imagen frontal del Pokémon.
         life: result.stats[0].base_stat,//valor numérico que indica la vida máxima del Pokémon.
         attack: result.stats[1].base_stat,// valor numérico que indica la fuerza de ataque del Pokémon.
         defense:result.stats[2].base_stat,//valor numérico que indica la defensa del Pokémon.
        speed:result.stats[3].base_stat,//valor numérico que indica la velocidad del Pokémon.
          height:result.height,// altura del Pokémon en decímetros.
         weight:result. weight,//peso del Pokémon en hectogramos.
         
         }
     
 }
 const getPokemonApiId = async (id) => {
     const result = await axios.get("https://pokeapi.co/api/v2/pokemon/"+id)
 .then((data) => {
     console.log(data.data);
 
     return data.data;// se extrae la propiedad data.results de los datos recibidos de la API y se devuelve como resultado.
     
 })
 return detailsPokemons(result)
 }

 const getPokemonDbId = async (id)=> {
    return await Pokemon.findByPk(id)
}
const getPokemonId = async (id) => {
   
    if (isNaN(id)){// "hj3h4-2342jhgb-233ll" ===> NaN "bdd"
        const pokemonDb = await getPokemonDbId(id);
        if (pokemonDb) return pokemonDb;
    }
    const pokemonId = await getPokemonApiId(id);
     return pokemonId;
}
 

const  getPokemonApiName = async (name)=> {
    const result = await axios.get("https://pokeapi.co/api/v2/pokemon/"+name)
    .then((data) => {
    
        return data.data;// se extrae la propiedad data.results de los datos recibidos de la API y se devuelve como resultado.
        
    })
    return detailsPokemons(result)
}
 
const  getPokemonDbName = async (name)=> {
 return await Pokemon.findOne({where:{name}})
}
 const getPokemonName = async (name) => {
    const pokemonDb = await getPokemonDbName(name);
    if (pokemonDb) return pokemonDb;
    const pokemonName = await getPokemonApiName(name);
     return pokemonName;
}



const postPokemon = async (pokemon) => {
    const pokemonNew = await Pokemon.create(pokemon)

        await pokemonNew.addTypes(pokemon.types);
        const myPokemon= await Pokemon.findByPk(
          pokemonNew.id, {
          include: {
            model: Type,
            through: {
              attributes: []
            }
          }
        }
        )

  return myPokemon

}



 


module.exports = {
    getAllPokemons,
    getPokemonId,
    getPokemonName,
    postPokemon
    }