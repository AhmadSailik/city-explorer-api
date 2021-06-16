'use strict'
require ('dotenv').config();
const express =require('express');
const weather = require('./data/weather.json');
const cors = require ('cors');
const axios = require('axios');

const servers = express();
servers.use(cors());


const PORT = process.env.PORT|3030;

const movieResult=require('./modules/Movie')
const weatheResultAPI=require('./modules/WeatherAPI')
// http://localhost:3030/
servers.get('/',homePage) 

//localhost:3030/dataOfWeatherAPI?lat=13.13&lon=-78.13
servers.get('/dataOfWeatherAPI',weatheResultAPI) 

//localhost:3030/dataOfmovie?query=joran
servers.get('/dataOfmovie',movieResult)


function homePage(req, res){
    res.send('home route class08');
};
     
servers.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})


