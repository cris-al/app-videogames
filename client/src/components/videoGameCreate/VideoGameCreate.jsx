import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, createVideoGame, getPlatforms } from "../../redux/actions";
import { Link } from "react-router-dom";
import Style from "./VideoGameCreate.module.css";
import Platforms from "../genresPlatforms/Platforms";
import Genres from "../genresPlatforms/Genres";

function validate(game){
    const errors = {}
    if(!game.name){
        errors.name = 'required';
    }
    if(!game.description){
        errors.description = 'required';
    }
    if(game.description.length>255){
        errors.description = 'error';
    }
    return errors;
}
export default function VideoGameCreate(){
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const platforms = useSelector(state => state.platforms);
    const [game, setGame] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        genres: []
    });
    const [errors, setErrors] = useState({});
    function handleChange(e){
        setGame({
            ...game,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({
                ...game,
                [e.target.name]: e.target.value
            })
        )
    }
    function handleRating(e){
        setGame({
            ...game,
            rating: e.target.value
        })
    }
    function handleGenres(e){
        setGame({
            ...game,
            genres: [...new Set([...game.genres, parseInt(e.target.value)])]
        })
        setErrors(validate({
            ...game,
            genres: [...game.genres, e.target.value]
        }))
    }
    function handlePlatforms(e){
        setGame({
            ...game,
            platforms: [...new Set([...game.platforms, e.target.value])]
        })
        setErrors(validate({
            ...game,
            platforms: [...game.platforms, e.target.value]
        }))
    }
    function handleSubmit(e){
        e.preventDefault();
        if(!game.name || !game.description || !game.platforms || !game.genres){
            alert('You must complete the required fields..!!');
        }else{
            if(errors){
                alert('Error..!!');
            }else{
                dispatch(createVideoGame(game));
                setGame({
                    name: '',
                    description: '',
                    released: '',
                    rating: '',
                    platforms: [],
                    genres: []
                })
                alert('VideoGame CREATED..');
            }
        }
    }
    function handleDeleteGenre(gr){
        setGame({
            ...game,
            genres: [...game.genres.filter(el => el!==gr)]
        })
    }
    function handleDeletePlatform(pf){
        setGame({
            ...game,
            platforms: [...game.platforms.filter(el => el!==pf)]
        })
    }
    useEffect(()=>{
        dispatch(getGenres());
    },[dispatch]);
    useEffect(()=>{
        dispatch(getPlatforms());
    },[dispatch]);
    return(
        <div className={Style.containerVC}>
            <h1 className={Style.titleVC}>Create VideoGame</h1>
            <form onSubmit={handleSubmit}>
                <div className={Style.divName}>
                    <label>Name:*</label>
                    <input type="text" name='name' value={game.name} 
                    onChange={handleChange} className={Style.inVC}/>
                </div>
                    {errors.name?(<small>{errors.name}</small>):(false)}
                <div className={Style.divReleased}>
                    <label>Released Date: </label>
                    <input type="date" name='released' value={game.released} 
                    onChange={handleChange} className={Style.inVC}/>
                </div>
                <div className={Style.divRating}>
                    <label>Rating: </label>
                    <select onChange={handleRating} className={Style.selRat}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <div className={Style.divDes}>
                    <label>Description:*</label>
                    <textarea name="description" value={game.description} cols="30" rows="6" 
                    onChange={handleChange} className={Style.inVC}/>
                </div>
                    {errors.description?(<small>{errors.description}</small>):(false)}
                <div className={Style.divPlatf}>
                    <label>Platforms:*</label>
                    <select onChange={e => handlePlatforms(e)} className={Style.sel1}>
                        {
                            platforms?.map((el,index) => (
                                <option key={index} value={el}>{el}</option>
                            ))
                        }
                    </select>
                </div >
                <div className={Style.divGenres}>
                    <label>Genres:*</label>
                    <select onChange={e => {handleGenres(e)}} className={Style.sel2}>
                        {
                            genres?.map(el => (
                                <option value={el.id} key={el.id}>{el.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit" className={Style.btnCreate}>Create</button>
                <Link to='/home'><button className={Style.btnBack}>Back</button></Link>
            </form>
            <div className={Style.containerPfGr}>
                {
                    game.genres.length?
                    <Genres genres={game.genres} delGenre={handleDeleteGenre}/>:false
                }
                {
                    game.platforms.length?
                    <Platforms platforms={game.platforms} delPlatform={handleDeletePlatform}/>:false
                }
            </div>
        </div>
    )
}