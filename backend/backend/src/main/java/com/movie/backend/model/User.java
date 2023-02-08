package com.movie.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="suren_user")
public class User implements UserDetails {

    //primary key for this table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //refers to the username
    @Column(name="username")
    private String username;
    
    //refers to the username
    @Column(name="email")
    private String email;

    //refers to the password
    @Column(name="password")
    private String password;

    //refers to the role
    @Column(name="role")
    private String role;

    //all the override method comes from UserDetails implmentation
    @Override
    //will returns a list of role (single role)
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return password;
    }
}