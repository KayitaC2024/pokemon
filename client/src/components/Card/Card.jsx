import React from "react";
import { NavLink } from "react-router-dom";
import noImage from '../../img/noImage.png';
import styles from './Card.module.css';

const Card = ({ name, types, img, id }) => {
  return (
    <div className={styles.cardContainer}>
      <NavLink className={styles.none} to={`/detail/${id}`}>
        <div className={styles.card}>
          <div className={styles.imgCard}>
            <div className={styles.imgCenter}>
              <img className={styles.img} src={img || noImage} alt={name} />
            </div>
          </div>
          <div >
            <span>{name}</span>
            <div >
              {types &&
                types?.map((type, index) => (
                  <span key={index}>
                    {type}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Card;

