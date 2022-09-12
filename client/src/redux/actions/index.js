import axios from 'axios';

export const GET_VIDEOGAME = 'GET_VIDEOGAME';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_GAME_DETAILS = 'GET_GAME_DETAILS';
export const CLEAR_PAGE = 'CLEAR_PAGE';
export const ADD_FAV = 'ADD_FAV';

export const getVideoGame = () =>{
    return function(dispatch){
       fetch('http://localhost:3001/videogames')
        .then(res => res.json())
        .then(json => dispatch({
            type:GET_VIDEOGAME,
            payload: json
        }))
    }
}
export const getGenres = () => {
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
}
export const getPlatforms = () => {
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames/platforms');
        return dispatch({
            type: GET_PLATFORMS,
            payload: json.data
        })
    }
}
export const createVideoGame = (payload) => {
    return async function(dispatch){
        var response = await axios.post('http://localhost:3001/videogames/create', payload);
        return response;
    }
}
export const getVideoGameName = (name) =>{
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames/search?name='+name);
        console.log(json);
        return dispatch({
            type: SEARCH_BY_NAME, 
            payload: json.data
        })
    }
}
export const getGameDetails = (id) => {
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames/'+id);
        return dispatch({
            type: GET_GAME_DETAILS,
            payload: json.data
        })
    }
}
export const filterByGenre = (payload) => {
    return{
        type: FILTER_BY_GENRE,
        payload
    }
}
export const filterCreated = (payload) => {
    return{
        type: FILTER_CREATED,
        payload
    }
}
export const orderByName = (payload) => {
    return{
        type: ORDER_BY_NAME,
        payload
    }
}
export const orderByRating = (payload) => {
    return{
        type: ORDER_BY_RATING,
        payload
    }
}
export const clear = () => {
    return{
        type: CLEAR_PAGE
    }
}
export const addFavourites = (payload)=>{
    return{
        type: ADD_FAV,
        payload
    }
}