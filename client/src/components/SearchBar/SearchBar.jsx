import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, cleanPokemons } from '../../actions';
import styles from './SearchBar.module.css';

const SearchBar = ({pagination}) => {
const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // dispatch(cleanPokemons());
    if (name.trim() !== '') {
      dispatch(getPokemonByName(name));
      pagination(1)
    }
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          onChange={handleInputChange}
          value={name}
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

