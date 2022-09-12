import React from "react";
import Style from './Paginated.module.css';

export default function Paginated({allVideogame, gamePerPage, paginated}){
    const pageNum = [];
    for (let i = 1; i <= Math.ceil(allVideogame/gamePerPage); i++) {
        pageNum.push(i);        
    }
    return(
        <div className={Style.container}>
            <ul>
                {pageNum?.map(num => (
                    <button onClick={()=> paginated(num)} key={num} className={Style.btnPg}>{num}</button>
                ))}
            </ul>
        </div>
    )
}