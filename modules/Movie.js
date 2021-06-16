const axios = require('axios');

const keyOfMovie= process.env.keyOfMovie;

function movieResult(req,res){
    let cityName=req.query.query;
   
    
    const movieURL=` https://api.themoviedb.org/3/search/movie?api_key=${keyOfMovie}&query=${cityName}`
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
};

module.exports = movieResult;