import {
    GET_POKEMONS,
    GET_ALL_TYPES,
    FILTER_CREATED,
    ORDER_NAME,
    FILTER_TYPE,
    ORDER_STR,
    GET_POKEMON_NAME,
    POST_POKEMON,
    GET_DETAILS,
    CLEAN_DETAIL,
    CLEAN_POKEMONS
  } from "../actions";
  
  const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    pokeDetail: {}
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_POKEMONS:
        return {
          ...state,
          pokemons: action.payload,
          allPokemons: action.payload
        };
      case CLEAN_POKEMONS:
        return {
          ...state,
          pokemons: action.payload
        };
      case GET_ALL_TYPES:
        return {
          ...state,
          types: action.payload
        };
        case FILTER_CREATED:
            let copy = [...state.allPokemons];
            let createdFiltered;
            if (action.payload === 'created') {
              createdFiltered = copy.filter(e => e.createdInBd);
            } else if (action.payload === 'api') {
              createdFiltered = copy.filter(e => !e.createdInBd);
            } else {
              createdFiltered = copy;
            }
            return {
              ...state,
              pokemons: createdFiltered
            };
          
          case FILTER_TYPE:
            let copyTwo = [...state.allPokemons];
          
            let typeFiltered = action.payload === 'all'
              ? copyTwo
              : copyTwo.filter(e => e.types && e.types.some(t => t.toLowerCase() === action.payload.toLowerCase()));
          
            if (typeFiltered.length <= 0) {
              console.log('There are no pokemons of the indicated type');
            }
          
            return {
              ...state,
              pokemons: typeFiltered
            };
          

  
  
  
            //sort => compara  los valores con el que encuentra 1 y con el que encuentra despues ordena-> derech/izq(> / <)(+ / -) 
      case ORDER_NAME:
        let copyThree = [...state.pokemons];
        let sortedName = action.payload === "asc"
          ? copyThree.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          : copyThree.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
  
        return {
          ...state,
          pokemons: sortedName
        };
  
      case ORDER_STR:
        let copyFour = [...state.pokemons];
        let sortedStr = action.payload === "asc"
          ? copyFour.sort((a, b) => a.attack - b.attack)
          : copyFour.sort((a, b) => b.attack - a.attack);
  
        return {
          ...state,
          pokemons: sortedStr
        };
  
        case GET_POKEMON_NAME:
            return {
              ...state,
              pokemons:[action.payload]

            };
          

          
  
      case GET_DETAILS:
        return {
          ...state,
          pokeDetail: action.payload
        };
  
      case CLEAN_DETAIL:
        return {
          ...state,
          pokeDetail: action.payload
        };
  
      case POST_POKEMON:
        return {
          ...state
        };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
  