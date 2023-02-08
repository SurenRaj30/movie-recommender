package com.movie.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="suren_movies_2")
public class Movie {
    //primary key for this table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="movieid")
    private int movieid;

    //refers to the movie title 
    @Column(name="title")
    private String title;

    //refers to the movie genres 
    @Column(name="genres")
    private String genres;

    //refers to the movie tmdbid
    @Column(name="tmdbid")
    private long tmdbid;

    //refers to the movie desc
    @Column(name="description")
    private String description;
}
