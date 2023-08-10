import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_NAME = 'ORDER_NAME';
export const FILTER_TYPE = 'FILTER_TYPE';
export const ORDER_STR = 'ORDER_STR';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const POST_POKEMON = 'POST_POKEMON';
export const GET_DETAILS = 'GET_DETAILS';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const CLEAN_POKEMONS = 'CLEAN_POKEMONS';

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      // let url = 'http://localhost:3001/pokemons'; x el deploy
      let url = '/pokemons';
      let response = await axios.get(url);
      dispatch({
        type: GET_POKEMONS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanPokemons = () => {
  return {
    type: CLEAN_POKEMONS,
  };
};

export const getAlltypes = () => {
  return async (dispatch) => {
    try {
      // let url = 'http://localhost:3001/types';
      let url = '/types';
      let response = await axios.get(url);
      dispatch({
        type: GET_ALL_TYPES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export const orderName = (payload) => {
  return {
    type: ORDER_NAME,
    payload,
  };
};

export const filterType = (payload) => {
    return {
      type: FILTER_TYPE,
      payload: payload.toLowerCase()
    };
  };
  

export const filterStr = (payload) => {
  return {
    type: ORDER_STR,
    payload,
  };
};

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
        // let url = `http://localhost:3001/pokemons/name?name=${name}`;
        let url = `/pokemons/name?name=${name}`;
        let response = await axios.get(url);

      dispatch({
        type: GET_POKEMON_NAME,
        payload: response.data,
      });
    } catch (error) {
      alert('Pokemon not found');
      // window.location.href = "http://localhost:3000/home";
      window.location.href = "/home";
      console.log(error.message);
    }
  };
};

export const getDetailPromise = (id) => {
  return (dispatch) => {
    // axios.get(`http://localhost:3001/pokemons/${id}`)
    axios.get(`/pokemons/${id}`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: GET_DETAILS,
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
    payload: {},
  };
};

export const postPokemon = (payload) => {
  return async () => {
    try {
      // let response = await axios.post('http://localhost:3001/pokemons', payload);
      let response = await axios.post('/pokemons', payload);
      console.log(response);
      alert('New pokémon is created!');
      return response;
    } catch (error) {
      alert('Pokemon name already exists');
      console.log(error);
    }
  };
};
