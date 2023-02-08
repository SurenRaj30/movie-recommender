package com.movie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.movie.backend.model.Rating;

//connect to the suren_ratings table
public interface RatingRepository extends JpaRepository<Rating, Long> {
    

}
