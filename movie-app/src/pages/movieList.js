import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from "react-router-dom";
import NavUser from "../layouts/nav";


const Movies = () => {

	//get items from localStorage
	const jwt = localStorage.getItem('jwt');
	const id = localStorage.getItem('user_id');
	const username = localStorage.getItem('username');

	const [movies, setMovies] = useState([]);
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

	useEffect(()=>{

		const fetchData = async () => {

			//gets the all the movie list
			const movieResponse = await fetch("http://localhost:8080/api/v1/user/getMovieList")
			const movieResult = await movieResponse.json();

			//get correponds movie information from tmdb (to get the poster path)
			const tmdbMovies = await Promise.all(
				//iterate through the movieResult
				movieResult.map(async (movie) => {
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
		fetchData();
    }, [])

	//add to favs function
	function addToFavourites(movieid) {
		//send selected movie data to be added as favorite
		const url = `http://localhost:8080/api/v1/user/addToFav/${movieid}/4`;
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

	return (
		<>
		<NavUser />
		<div className='container-fluid movie-app mt-5'>
			<div className='row'>
				{movies.map((movie, id) => (
					<div className='col' key={id}>
						<div className='card mb-5' style={{width: "18rem"}}>
							<Link to={"/movie-detail/"+ movie.movieid}><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`} className='card-img-top' alt='movie-poster'/></Link>
							
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

export default Movies;
