package com.movie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie.backend.model.FavMovie;

public interface FavMovieRepository extends JpaRepository<FavMovie, Long> {
    
}
