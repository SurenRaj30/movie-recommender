import "../styles/nav.css"

//nav bar for admin
function NavAdmin() {

//gets the username from local storage
  const username = localStorage.getItem('username');
    return (
    <div className="sticky-top">
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
            <a className="navbar-brand" href="/admin/dashboard">Welcome, {username}</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    <li className="nav-item">
                        <a className="nav-link" href="/admin/dashboard">Dashboard</a>
                    </li>
                    
                    <li className="nav-item">
                        <a className="nav-link" href="/register">Add User</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/admin/addMovie">Add Movie</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/admin/movie-list">Movie List</a>
                    </li>

                    </ul>
                </div>
            </div>
        </nav>
    </div>

  );
}

export default NavAdmin;