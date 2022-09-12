import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clear, getGameDetails } from "../../redux/actions";
import Style from "./Details.module.css"

export default function Details(props){
    const dispatch = useDispatch();
    const id = props.match.params.id;
    useEffect(()=>{
        dispatch(getGameDetails(id));
        return ()=>{
            dispatch(clear());
        }
    }, [dispatch,id])
    const gameDetails = useSelector(state => state.gameDetails);

    return(
        <div className={Style.containerP}>
            {
                gameDetails.length?
                (<div className={Style.containerD}>
                    <img src={gameDetails[0].image} alt={gameDetails[0].name} className={Style.imageDetails}/>
                    <div className={Style.details}>
                        <h3>NAME: {gameDetails[0].name}</h3>
                        <h4>GENRES: {gameDetails[0].genres?.map(el => el.name+', ')}</h4>
                        <h4>RATING: {gameDetails[0].rating}</h4>
                        <h4>RELEASED: {gameDetails[0].released}</h4>
                        <h4>PLATFORMS: {gameDetails[0].platforms?.map(el => el+', ')}</h4>
                        <h4>DESCRIPTION: </h4>
                        <p>{gameDetails[0].description}</p>
                    </div>
                    <Link to='/home'><button className={Style.btnDetails}>Back</button></Link>
                </div>) : gameDetails.name?
                (<div className={Style.containerD}>
                    <img src={gameDetails.image} alt={gameDetails.name} className={Style.imageDetails}/>
                    <div className={Style.details}>
                        <h3>NAME: {gameDetails.name}</h3>
                        <h4>GENRES: {gameDetails.genres?.map(el => el+', ')}</h4>
                        <h4>RATING: {gameDetails.rating}</h4>
                        <h4>RELEASED: {gameDetails.released}</h4>
                        <h4>PLATFORMS: {gameDetails.platforms?.map(el => el+', ')}</h4>
                        <h4>DESCRIPTION: </h4>
                        <p>{gameDetails.description}</p>
                    </div>
                    <Link to='/home'><button className={Style.btnDetails}>Back</button></Link>
                </div>):<div className={Style.loadingD}></div>
            }
            
        </div>
    )
}