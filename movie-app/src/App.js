import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import {Routes, Route	} from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import MovieList from "./pages/MovieList"
import AddMovie from "./pages/addMovie"
import Dashboard from "./pages/dashboard"
import AdminMovie from "./pages/adminMovieList"
import MovieDetail from "./pages/movieDetail"
import MoviesSearch from "./pages/movieSearch"
import MovieFavsList from "./pages/favoriteMovieList"
import RatingList from "./pages/RatingList"
import RatingTablePagination from "./components/RatingTablePagination"

function App() {

  return (
   
	<Routes>
		<Route path="/movie-list" element={<MovieList />}/>
		<Route path="/movie-detail/:id" element={<MovieDetail />} />
		<Route path="/" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route path="/movie-favs" element={<MovieFavsList />} />
		<Route path="/movie-ratings" element={<RatingList />} />
		<Route path="/movie-search" element={<MoviesSearch />} />
		<Route path="/admin/addMovie" element={<AddMovie />} />
		<Route path="/admin/movie-list" element={<AdminMovie />} />
		<Route path="/admin/dashboard" element={<Dashboard />} />
  	</Routes>

  )
}

export default App