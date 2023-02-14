import {useEffect, useState} from "react";
import NavAdmin from "../layouts/nav_admin";
import ATMPagination from "../components/AdminTableMoviePagination";
import ClockLoader from "react-spinners/ClockLoader";

function AdminMovie ()
{
    
    //for loading state
	const[loading, setLoading] = useState(false);
    //get jwt token stored in local storage
    const jwt = localStorage.getItem('jwt');
    //get the movies from endpoint
    const[movies, setMovies] = useState([]);

    useEffect(()=>{
        //set loading spinner at the start of fetch
        setLoading(true);
        //fetch movies list for admin movie table
        const url = "http://localhost:8080/api/v1/admin/getMoviesList";

        fetch(url, {
            method: "GET",
            headers: {
                'Authorization':'Bearer '+jwt,
                'Content-Type':'application/json'
            },
        })
        .then((response) => Promise.all([response.json()]))
        .then(([data])=> {
            console.log("Data")
            console.log(data[0].movieid)

            //set temp var to set users data
            const f_temp = data;
            //turn off loading animation
            setLoading(false);
			//set movie_id
			setMovies(f_temp);
        })
    }, [])
    
    return (
        <>
            <NavAdmin />
            <div className='d-flex justify-content-center mt-5'>
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
                    <div  className="container mt-5" style={{width: "80%"}}>
                        <ATMPagination 
                            data={movies}
                            pageLimit={3}
                            dataLimit={10}
                        />
                    </div>
                </>
                ) : (
                    <div className='d-flex justify-content-center'>
                        <h1>Loading...</h1>
                    </div>
                )}
            </div>
       
        </>
       
    )
}
export default AdminMovie;