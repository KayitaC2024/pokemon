import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanPokemons, getPokemons } from '../../actions';
import Card from '../Card/Card';
import Filters from '../Filters/Filters';
import Pagination from '../Pagination/Pagination';
import Nav from '../Nav/Nav';
import styles from './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  // Resto del código...

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const [order, setOrder] = useState('');
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  // Asegurarse de que allPokemons sea un array o asignar un array vacío por defecto
  const allPokemonsArray = Array.isArray(allPokemons) ? allPokemons : [];

  // Utilizar allPokemonsArray en lugar de allPokemons para calcular currentPokemons
  const currentPokemons = allPokemonsArray.slice(indexOfFirstPokemon, indexOfLastPokemon);

  // Función para cambiar de página
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   // Función para limpiar y obtener nuevos pokemons
   const handleClick = (e) => {
    e.preventDefault();
    dispatch(cleanPokemons());
    dispatch(getPokemons());
  };
  
  useEffect(() => {
            dispatch(getPokemons());
        }, [dispatch]);
  return (
    <div>
      <div>
        <div className={styles.home}>
          <Nav />
          <div className={styles.filters}>
            <Filters pagination={pagination} setCurrentPage={setCurrentPage} setOrder={setOrder} />
            <button className={styles.btn} onClick={handleClick}>
              Borrar filtros
            </button>
          </div>
          <div>
            <div>
              <Pagination
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemonsArray.length}
                pagination={pagination}
              />
            </div>
            {allPokemonsArray.length > 0 ? (
              <div className={styles.cards}>
                {currentPokemons.map((pokemon) => (
                  <div key={pokemon.id} className={styles.card}>
                    <Card
                      id={pokemon.id}
                      name={pokemon.name}
                      img={pokemon.img ? pokemon.img : pokemon.image} // p.image? p.image : <img src='url....'/>
                     //img={pokemon.image}
                      types={pokemon.types}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>No hay datos </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { cleanPokemons, getPokemons } from '../../actions';
// import Card from '../Card/Card';
// import Filters from '../Filters/Filters';
// import Pagination from '../Pagination/Pagination';
// import Nav from '../Nav/Nav';
// import styles from './Home.module.css';

// export default function Home() {
//     const dispatch = useDispatch();
//     const allPokemons = useSelector((state) => state.pokemons);
//     // Paginación
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
//     const [order, setOrder] = useState('');
//     const indexOfLastPokemon = currentPage * pokemonsPerPage;
//     const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
//     console.log(allPokemons);
//     const currentPokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon);

//     const pagination = (pageNumber) => {
//         setCurrentPage(pageNumber);
        
//     };

//     useEffect(() => {
//         dispatch(getPokemons());
//     }, [dispatch]);

//     const handleClick = (e) => {
//         e.preventDefault();
//         dispatch(cleanPokemons());
//         dispatch(getPokemons());
//     };

//     return (
//         <div>
//             <div>
//                 <div className={styles.home}>
//                 <Nav/>
//                     <div className={styles.filters}>
//                         <Filters pagination={pagination} setCurrentPage={setCurrentPage} setOrder={setOrder} />
//                         <button className={styles.btn} onClick={handleClick}>
//                             Borrar filtros
//                         </button>
//                     </div>
//                     <div>
//                         <div>
//                             <Pagination
//                                 pokemonsPerPage={pokemonsPerPage}
//                                 allPokemons={allPokemons.length}
//                                 pagination={pagination}
//                             />
//                         </div>
//                         {allPokemons.length > 0 ? (
//                             <div className={styles.cards}>
//                                 {currentPokemons.map((pokemon) => (
//                                     <div key={pokemon.id} className={styles.card}>
//                                         <Card
//                                             id={pokemon.id}
//                                             name={pokemon.name}
//                                             img={pokemon.image}
//                                             types={pokemon.types}
//                                         />
//                                     </div>

//                                 ))}
//                             </div>
//                         ) : (
//                             <div>No Ahi datos </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// }

 