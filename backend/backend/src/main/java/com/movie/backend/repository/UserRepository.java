package com.movie.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie.backend.model.User;

//connect to the suren_users table
public interface UserRepository extends JpaRepository<User, Long> {
   
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    
}
