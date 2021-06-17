'use strict'
require ('dotenv').config();
const express =require('express');

const cors = require ('cors');


const servers = express();
servers.use(cors());


const PORT = process.env.PORT;

const movieResult=require('./modules/Movie')
const weatheResultAPI=require('./modules/WeatherAPI')
const weatheResultJSON=require('./modules/WeatherJson')
// http://localhost:3010/
servers.get('/',homePage) 

//localhost:3010/dataOfWeatherAPI?lat=13.13&lon=-78.13
servers.get('/dataOfWeatherAPI',weatheResultAPI) 

//localhost:3010/dataOfmovie?query=joran
servers.get('/dataOfmovie',movieResult)


function homePage(req, res){
    res.send('home route class08');
};

//localhost:3010/dataOfWeatherJSON?dataOfcity=Seattle
servers.get('/dataOfWeatherJSON',weatheResultJSON)
     
servers.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})


