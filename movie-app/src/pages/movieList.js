import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import NavUser from "../layouts/nav";
import UserMoviePagination from '../components/UserMoviePagination';
import Movie from '../components/Movie';
import ClockLoader from "react-spinners/ClockLoader";


const MovieList = () => {
	
	//for loading state
	const[loading, setLoading] = useState(false);
	//get items from localStorage
	const jwt = localStorage.getItem('jwt');
	//get user id from local storage
	const id = localStorage.getItem('user_id');
	//get username from local storage
	const username = localStorage.getItem('username');

	const [movies, setMovies] = useState([]);
	//set movie id
	const[movie_id, setMovieID] = useState([]);

	useEffect(()=>{
		//set loading spinner at the start of fetch
		setLoading(true);
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
			setLoading(false);
			setMovies(tmdbMovies);
		}
		fetchData();
		
    }, [])

	return (
		<>
		<NavUser />
            <div className='container-fluid movie-app mt-5'>
				<div className='d-flex justify-content-center'>
					<ClockLoader
						loading={loading}
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
				<div>
					{movies.length > 0 ? (
						<>
							<UserMoviePagination
								data={movies}
								RenderComponent={Movie}
								title="Movies"
								pageLimit={5}
								dataLimit={48}
							/>
						</>
					) : (
						<div className='d-flex justify-content-center'>
							<h1>Loading...</h1>
						</div>
					)}
    			</div>
            </div>
		</>
		
	);
};

export default MovieList;
