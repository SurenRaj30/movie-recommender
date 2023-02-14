package com.movie.backend.config;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

//intercepts the http request from login
//extended method -> filter one request per time
@Component
//helps to create const for private final vars
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    //responsible in handling jwt token
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
        //intercept request(from react) and response (spring)
        @NonNull HttpServletRequest request, 
        @NonNull HttpServletResponse response, 
        //contains list of other filter that need to be executed
        @NonNull FilterChain filterChain
        ) throws ServletException, IOException {

            //get the request header (from postman/react)
            final String authHeader = request.getHeader("Authorization");
            //refers to the jwt token present in auth header
            final String jwt;
            //refers to the username present in jwt token
            final String userName;
            //if condition is not fulfilled, the filtering will stop at this point
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                //pass the request/response to next filter
                filterChain.doFilter(request, response);
                return; 
            }
            //extract jwt token from auth header
            //token starts at position no 7, including "Bearer "
            jwt = authHeader.substring(7);
            //extract username from jwt token (calls the jwt service)
            userName = jwtService.extractUsername(jwt);
            //check if the username is present and if the user is authenticated
            if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                //checks if the user is in database
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userName);

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    //updates the security context if the jwt token is valid
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                    );
                    //build details based on HTTP request
                    authToken.setDetails(
                      new WebAuthenticationDetailsSource().buildDetails(request)  
                    );
                    //updates security context holder
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            //calls the next filter
            filterChain.doFilter(request, response);
        
    }
    
}
