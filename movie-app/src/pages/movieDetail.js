import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom'
import film from '../assets/film.png';
import NavUser from "../layouts/nav";


const MovieDetail = () => {
    
    //set rating
    const[rating, setRating] = useState("");
    //set similiar movies
    const[sim_movies, setSimMovies] = useState([]);
    //set movie detail from tmdb
    const[tmdb_movies, setTMDBMovies] = useState([]);
    //set selected movie detail
    const[sel_movie, setSelMovie] = useState([]);
    //set description for movies
    const[desc, setDesc] = useState("");

    //set user details
    const id = localStorage.getItem("id");
    //gets movie id from url
    const params = useParams();

    //for selected movie detail
    useEffect(() => {

        const fetchData = async () => {
            //gets the selected movie details
            const s_movies_url = await fetch(`http://localhost:8080/api/v1/user/getMovieDetail/${params.id}`);
            const s_movies_result = await s_movies_url.json();

            //get the correspond movie information from tmdb (to get the poster)
            const tmdb_movie_details = await fetch(`https://api.themoviedb.org/3/movie/${s_movies_result.tmdbid}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee&language=en-US`)
            const tmdb_movies_result = await tmdb_movie_details.json();

            setSelMovie(s_movies_result);
            setTMDBMovies(tmdb_movies_result);
        }
        fetchData();
    }, [])
    
    
    //for similiar movies
    useEffect(() => {

        const fetchData = async () => {

			const movieResponse = await fetch(`http://localhost:8080/api/v1/user/getMovies/${params.id}`)
			const movieResult = await movieResponse.json();

			const tmdbMovies = await Promise.all(
				movieResult.map(async (movie) => {
					const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.tmdbid}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee&language=en-US`);
					const tmdbResult = await tmdbResponse.json();
					return {
						...movie,
						poster_path:  tmdbResult.poster_path,
					};
				})
			);
				setSimMovies(tmdbMovies);
		}
		fetchData();

    }, [])

    //handle rating submission
    const submitRating = (e) => {

        e.preventDefault();

        const reqBody = {
            userid: id,
            rating: rating,
            movieid: params.id

        }
     
        fetch("http://localhost:8080/api/v1/user/addRating", {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody),
        })
        .then((response) => {
            if (response.status === 200) {
                alert("Add Rating Was Successful")
                window.location.href = "/movie-list";
            } else {
                throw new Error("Error. Please Try Again");
            }
        })
        .catch((message) => {alert(message)})
    }

    return(
        <>
            <NavUser />
            <section>
                <div className="d-flex m-5">
                    <div className='card mb-5' style={{width: "15rem"}}>
                        <img src={`https://image.tmdb.org/t/p/w500/${tmdb_movies.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`} className='card-img-top' alt='movie-poster'/>
                    </div>
                    <div className="ml-3">

                        <h3>{sel_movie.title}</h3> 
                        <h3>{sel_movie.genres}</h3> 
                        <p>{desc}</p>

                        <input type="number" className="form-control"
                            id="rating" 
                            value={rating} 
                            onChange={(event) => setRating(event.target.value)}
                            min="1"
                            max="5"/>
                            <button className="btn btn-primary btn-sm" type="submit" onClick={submitRating}>Add Rating</button>
                    </div>
                </div>
            </section>
            <section className="m-5">
                <h3>Similiar Movies</h3>
                <div className="row">
                {sim_movies.map((sim_movie, id) => (
					<div className='col' key={id}>
						<div className='card mb-5' style={{width: "18rem"}}>
                            <img src={`https://image.tmdb.org/t/p/w500/${sim_movie.poster_path}?api_key=17d6dd8cf5cfd7d1dbbafac3e5eefcee`} className='card-img-top' alt='movie-poster'/>
							
							<h5 className='card-title'>{sim_movie.title}</h5>
							<p className="card-text"></p>
								<div className="row">
									<div className="col">
										<td><button style={{width: "100%"}} className='btn btn-primary d-block'>Add to Favourites</button></td>
									</div>
								</div>
						</div>
					</div>
				))}
                    
                </div>
            </section>
        </>
    )
}

export default MovieDetail;