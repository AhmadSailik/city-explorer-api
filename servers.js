'use strict'
require ('dotenv').config();
const express =require('express');
const weather = require('./data/weather.json');
const cors = require ('cors');
const axios = require('axios');

const servers = express();
servers.use(cors());


const PORT = process.env.PORT;//line 91
const keyOfWeather= process.env.keyOfWeather;//line 32
const keyOfMovie= process.env.keyOfMovie;//line 55

// http://localhost:3030/
servers.get('/',homePage) 

//localhost:3030/dataOfWeather?lat=13.13&lon=-78.13&days=16&units=M&lang=en
servers.get('/dataOfWeather',weatheResult) //line 28

//localhost:3030/dataOfmovie?region=DE&language=en-ENrelease_date.gte=2021-05-15&release_date.lte=2021-06-15&with_release_type=3|2
servers.get('/dataOfmovie',movieResult)//line 51


function homePage(req, res){
    res.send('home route');
};

function weatheResult(req,res){//line 72
    let latNumber=req.query.lat;
    let lonNumber=req.query.lon;
    
    const weatrerURL=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latNumber}&lon=${lonNumber}&days=16&units=M&lang=en&key=${keyOfWeather}`;

    axios.get(weatrerURL).then(resultOfWeatheer=>{

        const result = resultOfWeatheer.data.data.map(item=>{
        return new Weather(item)
            
   })
   res.send(result);

    })
    .catch(err =>{
        res.send(`there is an error in getting the data => ${err}`);
    })
    
};



function movieResult(req,res){//line 78
    let RegionCode=req.query.region;
   
    
    const movieURL=`https://api.themoviedb.org/3/discover/movie?api_key=${keyOfMovie}&language=en-EN&region=${RegionCode}&release_date.gte=2021-05-15&release_date.lte=2021-06-15&with_release_type=3|2`;

    axios.get(movieURL).then(resultOfmovie=>{

        const result = resultOfmovie.data.results.map(item=>{
        return new Movie(item)
            
   })
   res.send(result);

    })
    .catch(err =>{
        res.send(`there is an error in getting the data => ${err}`);
    })
    
};

class Weather{
    constructor(item){
        this.description = `low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
        this.date = item.valid_date;
    }
}
class Movie{
    constructor(item){
        this.title = item.title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes =item.vote_count ;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity =item.popularity ;
        this.released_on = item.release_date;

    }
}
      
servers.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})


