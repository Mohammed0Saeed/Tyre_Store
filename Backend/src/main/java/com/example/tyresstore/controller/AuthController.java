package com.example.tyresstore.controller;

import com.example.tyresstore.model.User;
import com.example.tyresstore.repository.UserRepository;
import com.example.tyresstore.config.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // For frontend requests
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authManager, UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.authManager = authManager;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody User user) {
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        if (user.getRole() == null) {
//            user.setRole("USER");
//        }
//        userRepository.save(user);
//        return ResponseEntity.ok("User registered successfully");
//    }

    @PostMapping("/login")
    // authenticate login request and create a suitable token for the user
    public ResponseEntity<?> login(@RequestBody User userRequest) {
        try {
            User user = userRepository.findByEmail(userRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Invalid username"));

            if (!passwordEncoder.matches(userRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body("Invalid password");
            }

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", user.getEmail());
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Something went wrong with the authentication");
        }
    }
}
