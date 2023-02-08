package com.movie.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name="suren_ratings")
public class Rating {

    //primary key for this table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //refers to the user id
    @Column(name="userid")
    private long userid;

    //refers to the movie id
    @Column(name="movieid")
    private long movieid;

    //refers to the rating value
    @Column(name="rating")
    private long rating;

}
