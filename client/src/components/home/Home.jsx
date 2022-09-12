import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getVideoGame, orderByName, orderByRating, filterByGenre, 
    filterCreated, addFavourites } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Paginated from "../paginated/Paginated";
import SearchBar from "../searchBar/SearchBar";
import Style from "./Home.module.css";

export default function Home(){
    const dispatch = useDispatch();
    let allVideogame = useSelector(state => state.videogames);
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('');
    const gamePerPage = 15;
    const indexLastGame = page * gamePerPage;
    const indexFirstGame = indexLastGame - gamePerPage;
    const games = allVideogame.msg?allVideogame.msg:allVideogame.slice(indexFirstGame, indexLastGame);
   
    const paginated = (pageNumber) => {
        setPage(pageNumber);
    }
    useEffect(()=>{
        dispatch(getVideoGame())
    }, [dispatch]);
    function handleClick(){
        dispatch(getVideoGame());
    }
    function handleOrderName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setPage(1);
        setOrder('Order' + e.target.value);
    }
    function handleOrderRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setPage(1);
        setOrder('Order' + e.target.value);
    }
    function handleFilterByGenre(e){
        e.preventDefault();
        setPage(1);
        dispatch(filterByGenre(e.target.value));
    }
    function handleFilterCreated(e){
        e.preventDefault();
        setPage(1);
        dispatch(filterCreated(e.target.value))
    }
    function handleAddFav(game){
        dispatch(addFavourites(game));
        alert('Add To FAVOURITE');
    }
    return(
        <div className={Style.home}>
            <Link to='/videogame/create'><h4>Create VideoGame</h4></Link>
            <Link to='/videogame/favourites'><h4>Favourites</h4></Link>
            <h1 className={Style.title}>VIDEOGAMES</h1>
            <button onClick={e => handleClick(e)} className={Style.btnH}>Reload VideoGames</button>
            <div>
                <SearchBar/>
                <select onChange={e => handleOrderName(e)} className={Style.selH}>
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                </select>
                <select onChange={e => handleOrderRating(e)} className={Style.selH}>
                    <option value="higher">Higher Rating</option>
                    <option value="lower">Lower Rating</option>
                </select>
                <select onChange={e => handleFilterCreated(e)} className={Style.selH}>
                    <option value="All">AllVideoGames</option>
                    <option value="created">Created</option>
                    <option value="existing">Existing</option>
                </select>
                <select onChange={e => handleFilterByGenre(e)} className={Style.selH}>
                    <option value="All">AllGenres</option>
                    <option value="Action">Action</option>
                    <option value="Indie">Indie</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Racing">Racing</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Sports">Sports</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Educational">Educational</option>
                    <option value="Card">Card</option>
                </select>
                {
                    typeof games === 'string'?
                    <p style={{color: '#eee', marginTop: '20px'}}>Not Found VideoGames</p>
                    :allVideogame.length>0?
                    <>
                        <Paginated 
                                allVideogame={allVideogame.length}
                                gamePerPage={gamePerPage}
                                paginated={paginated}/>
                       <div className={Style.cards}>
                       {
                        games.map(el => {
                                    return(
                                        <Card key={el.id}
                                              game={el}
                                              id={el.id}
                                              image={el.image} 
                                              name={el.name} 
                                              genres={el.genres}
                                              add={handleAddFav}/>)
                                })
                        }</div>
                    </>:
                    <div className={Style.loading1}>
                         <div className={Style.loading}></div>
                     </div>
                }
            </div>
        </div>
    )

}