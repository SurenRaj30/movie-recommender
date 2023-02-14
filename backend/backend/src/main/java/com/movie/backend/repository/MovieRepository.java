package com.movie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.movie.backend.model.Movie;

//connect to the suren_fav_movies table
public interface MovieRepository extends JpaRepository<Movie, Long> {
    
    //for both user and admin to fetch movies
    @Query(
        value="select * from suren_movies order by movieid desc", 
        nativeQuery = true)
    List<Movie> getMovies();

    //for user search query
    List<Movie> findByTitleIgnoreCaseContaining(String title);


}
