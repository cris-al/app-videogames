import React from "react";
import Style from './Genre.module.css';

export default function Genre({name, delGenre}){
    return(
        <div className={Style.contG}>
            <h5>{name}</h5>
            <button className={Style.btnGr} onClick={delGenre}>x</button>
        </div>
    )
}