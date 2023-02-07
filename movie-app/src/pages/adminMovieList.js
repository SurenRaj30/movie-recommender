import {useEffect, useState} from "react";
import NavAdmin from "../layouts/nav_admin";

function AdminMovie ()
{
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    const[movies, setMovies] = useState([]);

    useEffect(()=>{

        const url = "http://localhost:8080/api/v1/admin/getMoviesList";

        fetch(url, {
            method: "GET",
            headers: {
                'Authorization':'Bearer ',
                'Content-Type':'application/json'
            },
        })
        .then((response) => Promise.all([response.json()]))
        .then(([data])=> {
            console.log("Data")
            console.log(data[0].movieid)

            //set temp var to set users data
            const f_temp = data;
			//set movie_id
			setMovies(f_temp);
        })
    }, [])
    
    return (
        <>
         <NavAdmin />
            <div className="container mt-5" style={{width: "50%"}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genres</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie, id) => (
                        <tr key={id}>
                            <td>{movie.title}</td>
                            <td>{movie.genres}</td>
                            <td>{movie.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
       
    )
}
export default AdminMovie;