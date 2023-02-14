package com.movie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie.backend.model.FavMovie;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


//connect to the suren_fav_movies table
public interface FavMovieRepository extends JpaRepository<FavMovie, Long> {

    //get favorite movie list by user id
    @Query(
        value="select * from suren_fav_movies where userid=:userid", 
        nativeQuery = true)
    List<FavMovie> favMovieList(Long userid);
    
    //delete favorite movie by user id and movie id
    @Transactional
    @Modifying
    @Query(
        value="delete from suren_fav_movies where favmovieid=:movieid and userid=:userid", 
        nativeQuery = true)
    void deleteFavMovie(Long movieid, Long userid);
    
}
