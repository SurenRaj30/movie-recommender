import axios from "axios";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom"

function Login ()
{

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
    
        const reqBody = {
            username: username,
            password: password
        }

        fetch("http://localhost:8080/api/v1/auth/login", {
          method: "POST",
          Accept: "application/json",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        })
        .then((response) => {
            if (response.status === 200)
            return response;
            else throw new Error("Invalid credentials")
        })
        .then((response) => Promise.all([response.json()]))
        .then(([data]) => {
            const jwt = data.token
            localStorage.setItem('jwt', jwt);
            //set user details
            const user_id = data.user.id
            localStorage.setItem('id', user_id);

            const username = data.user.username
            localStorage.setItem('username', username)
            
            //gets user role
            const role = data.user.role;

            //redirect to after succesful login
            //check user role
            if(role === "USER") {
                window.location.href = "movie-list";
            } else if(role === "ADMIN") {
                window.location.href = "/admin/dashboard";
            }
            
        })
        .catch((message) => {alert(message)})
      }
    
    return (
        <div className="container" style={{width: "50%"}}>
            <h5 className="text-center mt-5">Welcome To Raj's Movie Website</h5>
                <form method="post" onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">User Name</label>
                        <input type="text" className="form-control" id="username" 
                        value={username} onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" 
                        value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary mr-5">Submit</button>
                </form>
        </div>
    )
}
export default Login;