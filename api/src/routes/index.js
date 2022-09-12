const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
//const {API_KEY} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//https://api.rawg.io/api/games?key=

const router = Router();
const API_KEY = process.env.API_KEY;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
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

router.get("/videogames", async (req, res)=>{
    try {
        let respuesta = await getAllVideoGames();
        res.json(respuesta);

    } catch (error) {
        console.log(error);
    }
})
router.get("/videogames/platforms", (req, res)=>{
    try{
        res.json(arrayPf);
    }catch(error){
        console.log(error);
    }
})
router.get("/videogames/search", async (req, res)=>{
    const name = req.query.name;
    let videogames = await getAllVideoGames();
    try {
        if(name){
            let games = videogames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            games.length?
            res.json(games):
            res.json({msg:'No existe ningun VideoGame con ese nombre...'});
        }else{
            res.send(videogames);
        }    
    } catch (error) {
        console.log(error);
    }
})
router.get("/videogames/:id", async (req, res)=>{
    const id = req.params.id;
    const allvideogames = await getAllVideoGames();
    const videogamesdb = await getVideoGamesDB();
    //const videogameapi = await getVideoGames();
    try {
        if(id){
            if(isNaN(id)){
                const filtdb = videogamesdb.filter(el => el.id === id);
                if(filtdb) res.json(filtdb);
                else res.send({mns:'The VideoGame does not exist..'})
            }else if(!isNaN(id)){
                const filtapi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
                if(filtapi){
                    const obj = {
                        image: filtapi.data.background_image,
                        id: filtapi.data.id,
                        name: filtapi.data.name,
                        description: filtapi.data.description_raw,
                        released: filtapi.data.released,
                        rating: filtapi.data.rating,
                        platforms: filtapi.data.platforms.map(el => {
                            const pf = el.platform.name;
                            return pf;
                        }),
                        genres: filtapi.data.genres.map(el => {
                            const gn = el.name;
                            return gn;
                        })
                    }
                    res.json(obj);     
                }else res.send({mns: 'The VideoGame does not exist..'})
            }

        }else{
            res.send(allvideogames);
        }
    } catch (error) {
        console.log(error);
    }
})
router.post("/videogames/create", async (req, res)=>{
    try {
        let {name, image, description, released, rating, platforms, genres} = req.body;
        let gameCreated = await Videogame.create({
            name, image, description, released, rating, platforms
        });
        gameCreated.addGenres(genres);
        res.send('VideoGame created..')
    } catch (error) {
        console.log(error);
    }
})
router.get("/genres", async (req, res)=>{
    const api = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    try {
        const genres = api.data.results.map(el => {
            const obj = {
                name: el.name
            }
            return obj;
        })
    
        genres.forEach(el => {
            Genre.findOrCreate({
                where: {name: el.name}
            })
        });
        
        const allGenres = await Genre.findAll();
        res.send(allGenres);
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;