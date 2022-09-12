import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Style from './Favourites.module.css';

export default function Favourites(){
    const favourites = useSelector(state => state.favourites);
    
    return(
        <div>
            <h1>Favourites</h1>
            {favourites?.map(el=>
                <div className={Style.containerFav}>
                    <div className={Style.containerCardFav}>
                        <Link to={`/details/${el.id}`}>
                        <img src={el.image} alt={el.name}/>
                        </Link>
                        <h3>NAME: {el.name}</h3>
                        <h3>GENRES: {el.genres?.map(el =>
                            el.name?el.name+', ':el+', ')}</h3>
                    </div>
                </div>)
            }
        </div>
    )
}