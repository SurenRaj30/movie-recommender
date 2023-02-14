import {useEffect, useState} from "react";
import NavUser from "../layouts/nav";
import FavoriteTablePagination from '../components/FavoriteTablePagination';

function MovieFavsList ()
{
    //get jwt token stored in local storage
    const jwt = localStorage.getItem('jwt');
    //get user id from local storage
    const id = Number(localStorage.getItem('id'));
    //set favourites movie objects
    const[f_movies, setFMovies] = useState([]);

    useEffect(()=>{

        const favRespose = async () => {
            //favorite movie list endpoint
            const url = `http://localhost:8080/api/v1/user/getFavMovies/${id}`;

            const favRespose = await fetch(url, {
                                method: "GET",
                                headers: {
                                    'Authorization':'Bearer '+jwt,
                                    'Content-Type':'application/json'
                                },
                            })
            const favResult = await favRespose.json();

            setFMovies(favResult)
        }
        favRespose();
    }, [])

    return (
        <>
		<NavUser />
            <div className="container mt-5" style={{width: "60%"}}>
                {/* renders the favorite list table */}
                <FavoriteTablePagination 
                        data={f_movies}
                        pageLimit={3}
                        dataLimit={5}
                />
            </div>
		</>
    )
}
export default MovieFavsList;