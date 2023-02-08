package com.movie.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name="suren_fav_movies")
public class FavMovie {
    
    //primary key for this table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //refers to the favorited movie id 
    @Column(name="favmovieid")
    private int favmovieid;

    //refers to the favorited movie title 
    @Column(name="title")
    private String title;

    //refers to the favorited movie genres 
    @Column(name="genres")
    private String genres;

    //refers to the user id
    @Column(name="userid")
    private long userid;


}
