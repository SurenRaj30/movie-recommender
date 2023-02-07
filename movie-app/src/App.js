import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import {Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Movies from "./pages/movieList"
import Generate from "./pages/generate"
import AddMovie from "./pages/addMovie"
import PrivateRoute from "./PrivateRoute"
import Dashboard from "./pages/dashboard"
import MovieFavs from "./pages/favourites"
import AdminMovie from "./pages/adminMovieList"
import MovieDetail from "./pages/movieDetail"
import MoviesSearch from "./pages/movieSearch"

function App() {

  return (
   
	<Routes>
		<Route path="/movie-list" element={<Movies />}/>
		<Route path="/movie-detail/:id" element={<MovieDetail />} />
		<Route path="/" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route path="/movie-favs" element={<MovieFavs />} />
		<Route path="/movie-search" element={<MoviesSearch />} />
		<Route path="/admin/generate" element={<Generate />} />
		<Route path="/admin/addMovie" element={<AddMovie />} />
		<Route path="/admin/movie-list" element={<AdminMovie />} />
		<Route path="/admin/dashboard" element={<Dashboard />} />
  	</Routes>

  )
}

export default App