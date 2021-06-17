const weather = require('../data/weather.json');

function weatheResultJSON(req,res){
let city=req.query.dataOfcity

    
const cityTruthy = weather.find(items => items.city_name.toLowerCase() === city.toLowerCase());
  if(cityTruthy != undefined)
  {   
        
        const resultOfJason = cityTruthy.data.map(item=> new WeatherJASON(item))
    
    res.send(resultOfJason)
  }else{
    errFunction(res)
  }
     
}

function errFunction(response) {
    response.send('please search about Seattle,Amman,Paris to show the result of weather');
  }
  
class WeatherJASON{
    constructor(item){
        this.decription = `low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
        this.date = item.valid_date;
    }
};

module.exports = weatheResultJSON;