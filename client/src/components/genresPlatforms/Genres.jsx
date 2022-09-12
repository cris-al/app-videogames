import React from "react";
import Genre from './Genre';
import Style from './Genres.module.css';

export default function Genres({genres, delGenre}){
    return (
        <div className={Style.containerGenres}>
            <h5>Genres:</h5>
            {genres.map(el => 
                <Genre key={el} name={el===1?'Action':
                el === 2?'Adventure':
                el === 3?'Indie':
                el === 4?'RPG':
                el === 5?'Strategy':
                el === 6?'Shooter':
                el === 7?'Casual':
                el === 8?'Simulation':
                el === 9?'Puzzle':
                el === 10?'Arcade':
                el === 11?'Platformer':
                el === 12?'Racing':
                el === 13?'Massively Multiplayer':
                el === 14?'Sports':
                el === 15?'Fighting':
                el === 16?'Family':
                el === 17?'Board Games':
                el === 19?'Card':
                el === 18?'Educational':false}
                delGenre={()=>delGenre(el)}/>)}
        </div>
    )
}