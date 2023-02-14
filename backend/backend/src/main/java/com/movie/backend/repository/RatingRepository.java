package com.movie.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.movie.backend.model.Rating;

//connect to the suren_ratings table
public interface RatingRepository extends JpaRepository<Rating, Long> {
    
     //for both user and admin to fetch movies
     @Query(
        value="select * from suren_ratings where userid=?", 
        nativeQuery = true)
    List<Rating> getRatings(Long id);

    @Transactional
    @Modifying
    @Query(
        value="delete from suren_ratings where movieid=:movieid and userid=:userid", 
        nativeQuery = true)
    void deleteRating(Long movieid, Long userid);



}
