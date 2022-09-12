import {GET_VIDEOGAME,
        SEARCH_BY_NAME,
        FILTER_BY_GENRE, 
        FILTER_CREATED, 
        ORDER_BY_NAME, 
        ORDER_BY_RATING,
        GET_GENRES,
        GET_PLATFORMS,
        GET_GAME_DETAILS,CLEAR_PAGE, ADD_FAV} from '../actions';

const initialSate = {
    videogames: [],
    videogamesCopy: [],
    genres: [],
    platforms: [],
    gameDetails: [],
    favourites: []
}

function reducer(state = initialSate, action){
    switch(action.type){
        case GET_VIDEOGAME:
            return{
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case GET_PLATFORMS:
            return{
                ...state,
                platforms: action.payload
            }
        case 'CREATE_VIDEOGAME':
            return{
                ...state
            }
        case GET_GAME_DETAILS:
            return{
                ...state,
                gameDetails: action.payload
            }
        case SEARCH_BY_NAME:
            return{
                ...state,
                videogames: action.payload
            }
        case FILTER_CREATED:
            const games= state.videogamesCopy;
            const fc = action.payload === 'created'? games.filter(el => el.created):
            games.filter(el => !el.created);
            return{
                ...state,
                videogames: action.payload === 'All'? games: fc
            }
        case FILTER_BY_GENRE:
            const allgame = state.videogamesCopy;
            const filt = action.payload === 'All'? allgame:
            allgame.filter(el => el.genres.includes(action.payload))
            return{
                ...state,
                videogames: filt
            }
        case ORDER_BY_NAME:
            let orderName = action.payload === 'asc'?
            state.videogames.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                return 0;}):
            state.videogames.sort(function(a, b){
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                videogames: orderName
            }
        case ORDER_BY_RATING:
            let orderRating = action.payload === 'higher'?
            state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) {
                    return 1;
                }
                if (a.rating < b.rating) {
                    return -1;
                }
                return 0;}):
            state.videogames.sort(function(a, b){
                if (a.rating > b.rating) {
                    return -1;
                }
                if (a.rating < b.rating) {
                    return 1;
                }
                return 0;})
                
                return{
                    ...state,
                    videogames: orderRating
            }
        case ADD_FAV:
            return{
                ...state,
                favourites: [...state.favourites, action.payload]
            }
        case CLEAR_PAGE:
            return{
                ...state,
                gameDetails: []
            }
        default: 
        return state
    }
}
export default reducer;