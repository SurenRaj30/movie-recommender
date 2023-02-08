import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import NavUser from "../layouts/nav";
import NavAdmin from "../layouts/nav_admin";

function MovieFavs ()
{
     //get jwt token stored in local storage
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    //set favourites movie objects
    const[f_movies, setFMOvies] = useState([]);

    useEffect(()=>{

        //feth favorite movies for user favorite movie list
        const url = "http://localhost:8080/api/v1/user/getFavMovies";

        fetch(url, {
            method: "GET",
            headers: {
                'Authorization':'Bearer ',
                'Content-Type':'application/json'
            },
        })
        .then((response) => Promise.all([response.json()]))
        .then(([data])=> {
            
            //set temp var to set users data
            const f_temp = data;
			//set movie_id
			setFMOvies(f_temp);
        })
    }, [])
    
    return (
        <>
         <NavUser />
            <div className="container" style={{width: "50%"}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Genres</th>
                        </tr>
                    </thead>
                    <tbody>
                    {f_movies.map((f_movie, id) => (
                        <tr key={id}>
                            <td>{f_movie.id}</td>
                            <td>{f_movie.title}</td>
                            <td>{f_movie.genres}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
       
    )
}
export default MovieFavs;