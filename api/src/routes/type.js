const { Router } = require('express');
const { Pokemon, Type} = require("../db");
const getTypesHandlers = require('../handlers/typeHandlers');

const router = Router();

router.get("/",  getTypesHandlers)


module.exports = router;