import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Movie(props) {

    //store fav movies objects
    const [fmovies, setFMovies] = useState([]);
    //destruc the attaibutes of data object (movie)
    const { movieid, poster_path, title } = props.data;

    //to fetch existing favourites list
    useEffect(() => {
        //endpoint to get all favs movie list
		const url = "http://localhost:8080/api/v1/user/getFavMovies";
		fetch(url, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            },
        })
        .then((response) => Promise.all([response.json()]))
        .then(([data]) => {
            //set temp var to set users data
            const f_temp = data;
			//set movie_id
			setFMovies(f_temp);
        })
    },[])

    //handles add to favs
    //add to favs function
	function addToFavourites(movieid) {
        //check if list is empty or not. then add the movie
        if (fmovies.length === 0) {
            //add the movie to favorites
            const url = `http://localhost:8080/api/v1/user/addToFav/${movieid}/1`;
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    //alerts user if adding to favorite was succesful
                    alert("Add To Favourites Was Successful")
                    window.location.href = "/movie-favs";
                } else {
                    //alerts if have any network error during post
                    throw new Error("Error. Please Try Again");
                }
            })
            .catch((message) => {alert(message)})
        }

        //check if the movie have already been added
        for(var i=0; i<fmovies.length; i++) {
            if (movieid === fmovies[i].favmovieid) {
                alert("Movie already added to favorites");
                return;
            } else {
               //add the movie to favorites
                const url = `http://localhost:8080/api/v1/user/addToFav/${movieid}/1`;
                fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type':'application/json'
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        //alerts user if adding to favorite was succesfull
                        alert("Add To Favourites Was Successful")
                        window.location.href = "/movie-favs";
                    } else {
                        //alerts if have any network error during post
                        throw new Error("Error. Please Try Again");
                    }
                })
                .catch((message) => {alert(message)})
            }
        }


	}

    return (
        <div className='card mb-5 shadow' style={{width: "20rem"}}>
            <Link to={"/movie-detail/"+ movieid}><img src={`https://image.tmdb.org/t/p/w500/${poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`} className='card-img-top' alt='movie-poster'/></Link>
            
            <div className="card-body" style={{borderRadius: "20px"}}>
                <h5 className='card-title' style={{fontSize: "15px"}}>{title}</h5>
                <p className="card-text"></p>       
                <button className='btn btn-primary w-100'  onClick={() => addToFavourites(movieid)}>Add to Favourites</button>
            </div>
        </div>
    )
}

export default Movie;