import React from "react";
import { Link } from "react-router-dom";
import Style from './Card.module.css';

export default function Card({game, id, image, name, genres, add}){
    return(
        <div className={Style.card}>
            <div className={Style.container}>
                <Link to={`/details/${id}`}>
                <img src={image} alt={name} className={Style.imageCard}/>
                </Link>
                <h3>NAME: {name}</h3>
                <h3>GENRES: {genres?.map(el => el.name?el.name+', ':el+', ')}</h3>
                <button onClick={()=>add(game)}>Add Favourites</button>
            </div>
        </div>
    )
}