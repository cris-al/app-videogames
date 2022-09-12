import React from "react";
import {Link} from 'react-router-dom';
import Style from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={Style.container}>
            <h1 className={Style.welcome}>Welcome To The VideoGames WebSite</h1>
            <Link to='/home'>
                <button className={Style.btnL}>HOME</button>
            </Link>
        </div>
    )
}