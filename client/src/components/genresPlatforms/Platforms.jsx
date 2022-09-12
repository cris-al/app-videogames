import React from "react";
import Platform from './Platform';
import Style from './Platforms.module.css';

export default function Platforms({platforms, delPlatform}){
    return (
        <div className={Style.containerPltf}>
            <h5>Platforms:</h5>
            {platforms.map((el,index) => 
                <Platform key={index} name={el} delPlatform={()=>delPlatform(el)}/>)}
        </div>
    )
}