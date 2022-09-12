import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <div>
            <h1 style={{marginTop: '140px'}}>ERROR 404 | NOT FOUND</h1>
            <Link to='/'>Go To Start</Link>
        </div>
    )

}