package com.movie.backend.auth;

import com.movie.backend.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    //data that is sent back to the user
    private String token;
    User user;
    
}
