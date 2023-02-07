import {useState} from "react";
import Select from "react-select";
import NavAdmin from "../layouts/nav_admin";

function Register ()
{
    const[username, setUserName] = useState("");
    const[email, setEmail] = useState("");
    const[role, setRole] = useState("");
    const[password, setPassword] = useState("");
    const[cpassword, setCPassword] = useState("");
    //to store error message for password that do not match
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const user_roles = [
        { value: 'USER', label: 'User' },
        { value: 'ADMIN', label: 'Admin' },
      ]

    const handleSubmit = (e) => {

        e.preventDefault();

        if(password !== cpassword) {
            setConfirmPasswordError("Password do not match");
            return
        } else {
            setConfirmPasswordError("");
        }

        const reqBody = {   
            username: username,
            email: email, 
            role:role,
            password: password
        }
     
        fetch("http://localhost:8080/api/v1/auth/register", {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody),
        })
        .then((response) => {
            if (response.status === 200) 
                window.location.href= "/admin/dashboard"
                else throw new Error("Registration Failed.");
        })
        .catch((message) => {alert(message)})
    }

    //for role dropdown
    const handleRole = (event) => {
        setRole(event.value);
    }

    return (
        <>
        <NavAdmin />
        <div className="container mt-5" style={{width: "50%"}}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">User Name</label>
                    <input type="text" className="form-control" placeholder="User Name" 
                        id="username" 
                        value={username} onChange={(event) => setUserName(event.target.value)}
                        required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Email" 
                        id="email" 
                        value={email} onChange={(event) => setEmail(event.target.value)}
                        required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <Select options={user_roles} onChange={handleRole}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Password" 
                        value={password} onChange={(event) => setPassword(event.target.value)}
                        id="password" 
                        required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm Password" 
                        value={cpassword} onChange={(event) => setCPassword(event.target.value)}
                        required/>
                    <p className="error-message">{confirmPasswordError}</p>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
            
    )
}

export default Register;