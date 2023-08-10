import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {

    return (
        <div>
            <h1 className={styles.title}>Henry  Pokemons!</h1>
            <Link to="/home">
                <button className={styles.button}>Enter</button>
            </Link>
        </div>
    );
}

export default LandingPage;