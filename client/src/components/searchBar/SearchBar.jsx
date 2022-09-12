import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { getVideoGameName } from "../../redux/actions";
import Style from './SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handelSubmit(e){
        e.preventDefault();
        dispatch(getVideoGameName(name));
        setName('');
    }
    
    return(
        <div className={Style.containerSB}>
            <input className={Style.in} value={name} type="text" 
            placeholder="Search..." onChange={e => handleInputChange(e)}/>
            <button type="submit" onClick={e => handelSubmit(e)} 
            className={Style.but}>Search</button>
        </div>
    )
}