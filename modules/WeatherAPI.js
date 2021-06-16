const axios = require('axios');

const keyOfWeather= process.env.keyOfWeather;


function weatheResultAPI(req,res){
    let latNumber=req.query.lat;
    let lonNumber=req.query.lon;
    
    const weatrerURLAPI=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latNumber}&lon=${lonNumber}&days=16&units=M&lang=en&key=${keyOfWeather}`;

    axios.get(weatrerURLAPI).then(resultOfWeatheer=>{

        const result = resultOfWeatheer.data.data.map(item=>{
        return new WeatherAPI(item)
            
   })
   res.send(result);

    })
    .catch(err =>{
        res.send(`there is an error in getting the data => ${err}`);
    })
    
};

class WeatherAPI{
    constructor(item){
        this.decription = `low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
        this.date = item.valid_date;
    }
};

module.exports = weatheResultAPI;