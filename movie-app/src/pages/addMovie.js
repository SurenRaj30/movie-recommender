import axios from "axios";
import {useState} from "react";
import Select from "react-select";
import NavAdmin from "../layouts/nav_admin";

//form for admin to add movie
function AddMovie ()
{
    //gets the jwt token from the database
    const jwt = localStorage.getItem('jwt');
    const[title, setTitle] = useState("");
    const[genre, setGenre] = useState("");
    const[desc, setDesc]  = useState("");

    //option for the genres dropdwown
    const Genres = [
        { label: "Horror", value: "Horror" },
        { label: "Drama", value: "Drama" },
        { label: "Crime", value: "Crime" },
        { label: "Thriller", value: "Thriller" },
        { label: "Adventure", value: "Adventure" },
      ];

    const handleSubmit = (e) => {

        e.preventDefault();

        //link to the form attributes
        const reqBody = {   
            title: title,
            genres: genre, 
            description: desc,
        }
        
        //endpoint to send the movie data
        fetch("http://localhost:8080/api/v1/admin/addMovie", {
            method: "POST", 
            headers: {
                'Authorization':'Bearer ',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //converts the form data to json 
            body: JSON.stringify(reqBody),
        })
        .then((response) => {
            if (response.status === 200) {
                //alert window if request was succesful
                alert("Add Movie Was Successful")
                //redirects to the movie-list
                window.location.href = "/admin/movie-list";
            } else {
                //prompts alert window if request failed
                throw new Error("Error. Please Try Again");
            }
        })
        .catch((message) => {alert(message)})
    }

    //to set value for genre dropdown
    const handleGenre = (event) => {
        setGenre(event.value);
    }
    return (
        <>
        <NavAdmin />
            <div class="container mt-5" style={{width: "50%"}}>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Movie Title</label>
                    <input type="text" class="form-control" placeholder="Movie Title" id="title" 
                     value={title} onChange={(event) => setTitle(event.target.value)}
                    required/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Movie Genre</label>
                        <Select options={Genres} onChange={handleGenre}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Movie Description</label>
                        <input type="text" class="form-control" placeholder="Movie Description" 
                        value={desc} onChange={(event) => setDesc(event.target.value)}
                        id="desc" required/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
         
    )
}

export default AddMovie;