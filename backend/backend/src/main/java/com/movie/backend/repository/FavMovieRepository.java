package com.movie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie.backend.model.FavMovie;

//connect to the suren_fav_movies table
public interface FavMovieRepository extends JpaRepository<FavMovie, Long> {
    
}
