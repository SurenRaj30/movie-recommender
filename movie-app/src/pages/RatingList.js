import {useEffect, useState} from "react";
import NavUser from "../layouts/nav";
import RatingTablePagination from "../components/RatingTablePagination";

function RatingList ()
{
    //get jwt from localStorage
    const jwt = localStorage.getItem('jwt');
    //get user id from localStorage
    const id = localStorage.getItem("id");

    //set the ratings list
    const[ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchRating = () => {

            const url = `http://localhost:8080/api/v1/user/getRatings/${id}`;

            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization':'Bearer '+jwt,
                    'Content-Type':'application/json'
                },
            })
            .then((response) => Promise.all([response.json()]))
            .then(([data])=> {

                //set temp var to store the ratings
                const ratings_temp = data;
                setRatings(ratings_temp);
            })
        }
        fetchRating();
    }, [])
    return (
        <>
		<NavUser />
            <div className="container mt-5" style={{width: "60%"}}>
                {/* renders the rating list table */}
                <RatingTablePagination 
                        data={ratings}
                        pageLimit={3}
                        dataLimit={5}
                />
            </div>
		</>
    )
}
export default RatingList;