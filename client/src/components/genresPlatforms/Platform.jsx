import React from "react";
import Style from './Platform.module.css';

export default function Platform({name, delPlatform}){
    return(
        <div className={Style.contPt}>
            <h5>{name}</h5>
            <button className={Style.btnPt} onClick={delPlatform}>x</button>
        </div>
    )
}