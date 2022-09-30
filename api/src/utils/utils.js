const { Videogame, Genre } = require('../db.js');
const API_KEY = process.env.API_KEY;

var arrayPf =[];
const getVideoGames = async () => {
    var api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    var apiInf = api.data.results;
    for (let i = 1; i < 5; i++) {
        const napi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i+1}`);
        apiInf = apiInf.concat(napi.data.results);
    }

    const games = apiInf.map(el =>{
        const obj = {
            image: el.background_image,
            id: el.id,
            name: el.name,
            released: el.released,
            rating: el.rating,
            platforms: el.platforms.map(el => {
                const pf = el.platform.name;
                return pf;
            }),
            genres: el.genres.map(el => {
                const gn = el.name;
                return gn;
            })
        }
        return obj;
    });
    for (var i = 0; i < games.length; i++) {
        for (let j = 0; j < games[i].platforms.length; j++) {
            if(!arrayPf.length) arrayPf.push(games[i].platforms[j]);
            else{
                if(!arrayPf.includes(games[i].platforms[j])) arrayPf.push(games[i].platforms[j]);
            }
        }
    }
    return games;
}
const getVideoGamesDB = async () => {
    return await Videogame.findAll({
        include: [{
            model: Genre
        }]
    });
}
const getAllVideoGames = async ()=> {
    let gamesApi = await getVideoGames();
    let gamesDB = await getVideoGamesDB();
    let total = [...gamesApi, ...gamesDB];

    return total;
}

module.exports = {
    getVideoGames, getAllVideoGames, getVideoGamesDB, arrayPf
}