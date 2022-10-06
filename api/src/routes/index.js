const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
const {getAllVideoGames, getVideoGamesDB, arrayPf} = require('../utils/utils');
const API_KEY = process.env.API_KEY;

const router = Router();

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
            res.json({msg:'VideoGame not found...'});
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
    try {
        if(id){
            if(isNaN(id)){
                const filtdb = videogamesdb.filter(el => el.id === id);
                if(filtdb) res.json(filtdb);
                else res.send({msg:'VideoGame not found..'})
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
                }else res.send({msg: 'VideoGame not found..'})
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
        let {name, description, released, rating, platforms, 
            genres, imageId, image} = req.body;
        if(!name) res.status(400).json({msg: 'name is require..'});
        if(!description) res.status(400).json({msg: 'description is require..'});
        if(!platforms) res.status(400).json({msg: 'platforms is require..'});
        if(!genres) res.status(400).json({msg: 'genres is require..'});
        let gameCreated = await Videogame.create({
            name, image, description, released, rating, platforms, imageId
        });
        gameCreated.addGenres(genres);
        res.status(200).json({msg:'VideoGame created..'})
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
        
        const allGenres = await Genre.findAndCountAll({attributes: ['name']});
        res.send(allGenres);
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;