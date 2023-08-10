const { Router } = require('express');
const { Pokemon, Type} = require("../db");
const {getAllPokemonHandler,getPokemonIDHandler,getPokemonNameHandler, postPokemonHandler } = require ('../handlers/pokemonsHandlers');

const router = Router();

router.get("/", async (req,res) =>{
    getAllPokemonHandler (req, res)
})

router.get("/name", async (req,res) =>{
    getPokemonNameHandler(req, res)
})

router.get("/:idPokemon", async (req,res) =>{
    getPokemonIDHandler (req, res)

})

router.post("/", async (req,res) =>{
    postPokemonHandler (req, res)
})



module.exports = router;