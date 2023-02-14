package com.movie.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie.backend.model.User;

//connect to the suren_users table
public interface UserRepository extends JpaRepository<User, Long> {
   
    //find user details by email
    Optional<User> findByEmail(String email);
    //find user details by email or username
    Optional<User> findByUsernameOrEmail(String username, String email);
    //find user details by username
    Optional<User> findByUsername(String username);
    //returns boolean if user exist
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    
}
