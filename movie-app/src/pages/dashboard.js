import {useEffect, useState} from "react";
import NavAdmin from "../layouts/nav_admin";

function Dashboard ()
{ 
    //get jwt token stored in local storage
    const jwt = localStorage.getItem('jwt');
    //set user objects once fetched
    const[users, setUsers] = useState([]);
    useEffect(()=>{

        //fetch user details (user objects) for admin user list
        const url = "http://localhost:8080/api/v1/admin/dashboard";

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
            const users_temp = data;
            setUsers(users_temp)
        })
    }, [])
    
    return (
        <>
            <NavAdmin />
            <div className="container mt-5" style={{width: "50%"}} >
                <table className="table table-bordered shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, id) => (
                        <tr key={id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
       
    )
}
export default Dashboard;