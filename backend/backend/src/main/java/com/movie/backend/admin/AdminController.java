package com.movie.backend.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie.backend.model.Movie;
import com.movie.backend.model.User;
import com.movie.backend.repository.MovieRepository;
import com.movie.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/admin")
//added cross origin to allow react communicate with spring server
@CrossOrigin(origins="http://localhost:3000")
public class AdminController {
    
    //dependency injection for user repo
    @Autowired
    private UserRepository userRepository;

    //dependency injection for movie repo
    @Autowired
    private MovieRepository movieRepository;

    //returs a list of user
    @GetMapping("/dashboard")
    public List<User> dashboard() {
        System.out.println(userRepository.findAll());
        return userRepository.findAll();

    }

    //movies routes
    //get movies list
    @GetMapping("/getMoviesList")
    public List<Movie> getMovies() {
        return movieRepository.getAdminMovies();
    }

    //add new movies
    @PostMapping("/addMovie")
    public void addMovie(@RequestBody Movie movie) {
        movieRepository.save(movie);
    }

}
