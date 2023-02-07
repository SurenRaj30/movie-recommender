package com.movie.backend.user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.movie.backend.model.FavMovie;
import com.movie.backend.model.Movie;
import com.movie.backend.model.Rating;
import com.movie.backend.model.User;
import com.movie.backend.repository.FavMovieRepository;
import com.movie.backend.repository.MovieRepository;
import com.movie.backend.repository.RatingRepository;
import com.movie.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/v1/user/")
//added cross origin to allow react communicate with spring server
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    //dependency injection for user repo
    @Autowired
    private MovieRepository movieRepository;

    //dependency injection for fav movie repo
    @Autowired
    private FavMovieRepository favMovieRepository;

    //dependency injection for rating repo
    @Autowired
    private RatingRepository ratingRepository;

    
     //*replace with application.properties values */
     static final String JDBC_DRIVER = "oracle.jdbc.driver.OracleDriver";
     static final String DB_URL = "jdbc:oracle:thin:@oracle-aziz.cilyihqptvjt.us-east-1.rds.amazonaws.com:1521:ORCL";
     static final String USER = "adminaziz";
     static final String PASS = "sMArt123_x";

    //get movies list for user main page
    @GetMapping("/getMovieList")
    public List<Movie> getMovies() {
        return movieRepository.getMovies();
    }
    
    //get movies details
    @GetMapping("/getMovieDetail/{movie_id}")
    public Movie getMovieDetail(@PathVariable("movie_id") long movie_id) {
        //find the movie by the id
        return movieRepository.findById(movie_id).get();
    }

    //add favourites
    @PostMapping("/addToFav/{movie_id}/{user_id}")
    public void addMovie(FavMovie fMovie, @PathVariable("movie_id") long movie_id, @PathVariable("user_id") long id) {
        
        //get movie details based on the movie_id
        Movie eMovie = movieRepository.findById(movie_id).get();

        //set attributes of e_movie to fmovie
        fMovie.setFavmovieid(eMovie.getMovieid());
        fMovie.setTitle(eMovie.getTitle());
        fMovie.setGenres(eMovie.getGenres());
        fMovie.setUserid(id);
        
        //save to db
        favMovieRepository.save(fMovie);
    }

    //get favs movie list
    @GetMapping("/getFavMovies")
    public List<FavMovie> getFavsMovies() {
        return favMovieRepository.findAll();
    }

    //add rating
    @PostMapping("/addRating")
    public void addRating(@RequestBody Rating rate) {
        
       //System.out.println(rate);
        ratingRepository.save(rate);
        
    }

    //get ratings list
    @GetMapping("/getRatings")
    public List<Rating> getRatings() {
        return ratingRepository.findAll();
    }

    //fetch movies based on pearson correlation
    @GetMapping("/getMovies/{movie_id}")
    public List<Movie> getPearson(@PathVariable("movie_id") int movie_id) {
        
        //List<String> movieID = new ArrayList<>();
        List<String> similarIDs = new ArrayList<>();
        List<String> similarTitles = new ArrayList<>();
        List<Movie> similarMovies = new ArrayList<>();
        Movie sim_movie = new Movie();

        int movieID = movie_id;
        
        //search movie ids in the pearson_table based on the movieID
        similarIDs = RunQuery("Select movie_id from pearsons_correlations_medium where ID_"+ movieID +" > 0.5", "movie_id");

        for (int i = 0 ; i < similarIDs.size(); i++){
            long similiarID = Long.parseLong(similarIDs.get(i));
            sim_movie = movieRepository.findById(similiarID).get();
            if(sim_movie.getMovieid() == movieID) {
                continue;
            }
            //add to list
            similarMovies.add(sim_movie);
        }

        return similarMovies;

    }
   
    //fetch search result
    @PostMapping("/search")
    public List<Movie> searchResult(@RequestParam("query") String query) {

        //search term
        String title = query;
        //System.out.println(movieName);
        return movieRepository.findByTitleIgnoreCaseContaining(title);
    }
    

       //return the movie result in a List of Strings
       static List<String> RunQuery(String myQuery, String myColumn){
        Connection conn = null;
        Statement stmt = null;
        List<String> result = new ArrayList<>();
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();

            String sql = myQuery;
            ResultSet rs = stmt.executeQuery(sql);

            while(rs.next()){
                result.add(rs.getString(myColumn));
            }
            rs.close();

            // in case shit hits the fan!
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    conn.close();
            } catch (SQLException se) {
            }
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }

        return result;
    }
}
