import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from "react-router-dom";
import NavUser from "../layouts/nav";


const MoviesSearch = () => {
	//get items from localStorage
	const jwt = localStorage.getItem('jwt');
	const[movies, setMovies] = useState([]);
	//set movie id
	const[movie_id, setMovieID] = useState([]);
	//rating options for rating drop down input
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

	//function to handle search (get invoked when user submit the form)
    const handleSearch = async (e) => {
        e.preventDefault();
		//endpoint for search (retrieves all the movies based on the query)
        const queryResponse = await fetch("http://localhost:8080/api/v1/user/search?query="+query, {
              method: "POST", 
              headers: {
				  'Authorization':'Bearer '+jwt,
                  'Accept': 'application/json',
              },
          })
		  //convert response to json
		 const queryResult = await queryResponse.json();
	
		 //get correponds movie information from tmdb (to get the poster path)
		  const tmdbMovies = await Promise.all(
			queryResult.map(async (movie) => {
				//iterate through the movieResult
				const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.tmdbid}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee&language=en-US`);
				const tmdbResult = await tmdbResponse.json();
				//and adds the all the movies details as the json attributes togerther with the poster_path
				return {
					...movie,
					poster_path:  tmdbResult.poster_path,
				};
			})
		);
		setMovies(tmdbMovies);

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
							<Link to={"/movie-detail/"+ movie.movieid}><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`} className='card-img-top' alt='movie-poster'/></Link>
							
							<h5 className='card-title'>{movie.title}</h5>
							<div className='card-body' style={{borderRadius: "20px"}}>
								<h5 className='card-title' style={{fontSize: "15px"}}>{movie.title}</h5>
								<p className="card-text"></p>       
								<button className='btn btn-primary w-100'>Add to Favourites</button>
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
