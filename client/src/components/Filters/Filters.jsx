import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAlltypes, filterCreated, orderName, filterType, filterStr } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Filters.module.css';

const Filters = ({ setCurrentPage, setOrder, pagination}) => {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAlltypes());
  }, [dispatch]);

  const handleFilterCreated = (e) => {
    const value = e.target.value;
    dispatch(filterCreated(value));
    setCurrentPage(1);
  };

  const handleOrderName = (e) => {
    const value = e.target.value;
    dispatch(orderName(value));
    setCurrentPage(1);// setee la pág en la 1
    setOrder(value);// estado local  vacio => modifique el estado local y se renderize
  };

  const handleFilterType = (e) => {
    const value = e.target.value;
    dispatch(filterType(value));
    setCurrentPage(1);
    setOrder(''); // Resetear el estado de orden al cambiar el filtro de tipo
  };

  const handleFilterStr = (e) => {
    const value = e.target.value;
    dispatch(filterStr(value));
    setCurrentPage(1);
    setOrder(value);
  };

  return (
    <div className={styles.div}>
      <div>
        <SearchBar pagination={pagination} />
      </div>
      <div>
        <h4 className={styles.h4}>Filters</h4>
        <label className={styles.label}>Created - Api</label>
        <select className={styles.select} onChange={handleFilterCreated}>
          <option value="all">ALL</option>
          <option value="api">API</option>
          <option value="created">CREATED</option>
        </select>

        <label className={styles.label}>Types</label>
        <select className={styles.select} onChange={handleFilterType}>
          <option value="all">ALL</option>
          {allTypes?.map((type) => (
            <option key={type.id} value={type.name.toLowerCase()}>
              {type.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4 className={styles.h4}>Order</h4>
        <select className={styles.select} onChange={handleOrderName}>
          <option value="">-</option> {/* Cambiar el valor de la opción predeterminada */}
          <option className={styles.order}>Strength</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
          <option className={styles.order}>Alphabetically</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;

