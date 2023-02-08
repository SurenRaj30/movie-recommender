package com.movie.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    //to manage registration 
    private final AuthenticationService service;
    @PostMapping("register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    //to manage login 
    @PostMapping("login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.login(request));
        
    }
}
