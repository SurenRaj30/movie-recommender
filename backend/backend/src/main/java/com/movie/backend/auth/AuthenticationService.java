package com.movie.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.movie.backend.config.JwtService;
import com.movie.backend.model.User;
import com.movie.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
    @Autowired
    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        
        //adds the user var with details such as username
        var user = User.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(request.getRole())
            .build();
        //saves the user in db
        repository.save(user); 
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
        .token(jwtToken)
        .build();
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        //check user details from request
        //exception would be thrown if cred is incorrect
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );
        //gets here after passing auth manager (if cred is valid)
        //checks if user exist in db
        var user = repository.findByUsername(request.getUsername()).orElseThrow();
        //generate token for user
        var jwtToken = jwtService.generateToken(user);
        //returns the token to user
        return AuthenticationResponse.builder()
        .user(user)
        .token(jwtToken)
        .build();
    }
    
}
