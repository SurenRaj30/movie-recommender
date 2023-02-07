import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from "react-router-dom";
import NavUser from "../layouts/nav";
import film from '../assets/film.png';


const MoviesSearch = () => {
	const[movies, setMovies] = useState([]);
	//set movie id
	const[movie_id, setMovieID] = useState([]);
	//rating options
	const ratings = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
		{ value: 3, label: '3' },
		{ value: 4, label: '4' },
		{ value: 5, label: '5' },
      ]
    //for search
    const[query, setQuery] = useState("");

	//add to favs function
	function addToFavourites(movieid) {
		const url = `http://localhost:8080/api/v1/user/addToFav/${movieid}/1`;
		fetch(url, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            },
        })
	}

    const handleSearch = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/v1/user/search?query="+query, {
              method: "POST", 
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
          })
          .then((response) => Promise.all([response.json()]))
          .then(([data])=> {
  
            //set temp var to set users data
            const movies_temp = data;
            setMovies(movies_temp);
            console.log(data);
      
          })
          .catch((message) => {alert(message)})
      }

	return (
		<>
		<NavUser />
		<div className='container-fluid movie-app mt-5'>
            <form onSubmit={handleSearch}>
                <input className="form-control me-2 ml-2 mr-2 mb-5" 
                        type="search" placeholder="Search" aria-label="Search" 
                        id="query"
                        value={query} onChange={(event) => setQuery(event.target.value)}
                />
            </form>
			<div className='row'>
				{movies.map((movie, id) => (
					<div className='col' key={id}>
						<div className='card mb-5' style={{width: "18rem"}}>
							<Link to={"/movie-detail/"+ movie.movieid}><img src={film} className='card-img-top' alt='movie-poster'/></Link>
							
							<h5 className='card-title'>{movie.title}</h5>
							<p className="card-text"></p>
								<div className="row">
									<div className="col">
										<td><button style={{width: "100%"}} className='btn btn-primary d-block' onClick={() => addToFavourites(movie.movieid)}>Add to Favourites</button></td>
									</div>
								</div>
						</div>
					</div>
				))}
			</div>	
		</div>
		</>
		
	);
};

export default MoviesSearch;
