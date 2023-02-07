package com.movie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.movie.backend.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    
    //for user
    @Query(
        value="select * from suren_movies_2 order by movieid asc fetch first 600 rows only", 
        nativeQuery = true)
    List<Movie> getMovies();
    
    //for admin
    @Query(
        value="select * from suren_movies order by movieid desc fetch first 600 rows only", 
        nativeQuery = true)
    List<Movie> getAdminMovies();

    // @Query(
    //     value="Select * from movies where movies.title LIKE %:query%",
    //     nativeQuery = true)
    // List<Movie> getSearchResult(String query);
    
    //for user search
    List<Movie> findByTitleIgnoreCaseContaining(String title);


}
