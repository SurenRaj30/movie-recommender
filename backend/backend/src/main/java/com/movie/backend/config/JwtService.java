package com.movie.backend.config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
//to build the JWT token
@Service
public class JwtService {

    //secret key to be signed when building the token
    private final String SECRET_KEY = "413F4428472B4B6250645367566B5970337336763979244226452948404D6351";

    //extracts username from jwt token
    //subject refers to the username present in the jwt token
    public String extractUsername(String token) {
       return extractClaim(token, Claims::getSubject);
    }

    //extract single claim from the token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {

        final Claims claims = extractAllColumns(token);
        return claimsResolver.apply(claims);
    }

    //calls the generate token method
    //send empty map
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    //build the token with specified attributes
    public String generateToken(
        //contains the extra claims to be added to the security
        Map<String , Object> extraClaims,
        UserDetails userDetails
    ) {
        return Jwts
                .builder()
                //set the username
                .setSubject(userDetails.getUsername())
                //set the roles of the user
                .claim("roles", userDetails.getAuthorities())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                //set jwt expiration time (24 hours expiration date)
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                //set the secret key
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                //will generate and return the token
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    //calls the expiration method
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    //gets the expiration time of the jwt token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    //extract all the claims from jwt token
    private Claims extractAllColumns(String token) {

        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    //decodes the secret key
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
