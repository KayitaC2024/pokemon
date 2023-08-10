import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch,  connect } from "react-redux";
import { getDetailPromise, cleanDetail, cleanPokemons } from "../../actions";
import { useEffect } from "react";
import noImage from '../../img/noImage.png';
import Loading from "../Loading/Loading";
import styles from './Detail.module.css'


const Detail = ({myPokemon,match}) => {
    const dispatch = useDispatch();
    console.log(myPokemon);

    useEffect(() => {
        dispatch(getDetailPromise(match.params.id))
        
        return () => {
            dispatch(cleanDetail(dispatch), cleanPokemons(dispatch))
        }
    }, [dispatch, match.params.id])


    return (
        <div>
            {
                myPokemon?.id?
                    <div className={styles.container}>
                        <div className={styles.card}>
                            <h2 className={styles.h2}>{myPokemon.name.charAt(0).toUpperCase() + myPokemon.name.slice(1)}</h2>
                            <p className={styles.p}>#{myPokemon.id}</p>
                            <img src={myPokemon.image ? myPokemon.image : noImage} alt="img not found" height="250px" width="200px" />
                            <div className={styles.types}>
                                <h3>{myPokemon.types?.map((e, k) => {
                                    return (
                                        <div className={styles.types} key={k}>
                                            <p className={styles.text}>{e.charAt(0).toUpperCase() + e.slice(1)}</p>
                                        </div>
                                    )
                                })} </h3>
                            </div>
                            <h5 className={styles.h5}>HP:  {myPokemon.life}</h5>
                            <h5 className={styles.h5}>Attack:  {myPokemon.attack}</h5>
                            <h5 className={styles.h5}>Defense:  {myPokemon.defense}</h5>
                            <h5 className={styles.h5}>Speed:  {myPokemon.speed}</h5>
                            <h5 className={styles.h5}>Height:  {myPokemon.height}</h5>
                            <h5 className={styles.h5}>Weight:  {myPokemon.weight}</h5>
                            <h5 className={styles.h5}>Types:  {myPokemon.types}</h5>

                        </div>
                    </div> :
                    <div>
                        <Loading />
                    </div>
            }
            <div>
                <Link to='/home'>
                    <button className={styles.btn}>Go back</button>
                </Link>
            </div>
        </div>

    );
}
const mapStateToProps= (state)=>{
    return {myPokemon: state.pokeDetail}

}
export default connect(mapStateToProps,null)(Detail);
