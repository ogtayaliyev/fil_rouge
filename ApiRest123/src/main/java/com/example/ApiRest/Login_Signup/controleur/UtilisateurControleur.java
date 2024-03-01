package com.example.ApiRest.Login_Signup.controleur;

import com.example.ApiRest.Login_Signup.dto.AuthentificationDTO;
import com.example.ApiRest.Login_Signup.dto.ConnexionResponse;
import com.example.ApiRest.Login_Signup.entite.Utilisateur;
import com.example.ApiRest.Login_Signup.securite.JwtService;
import com.example.ApiRest.Login_Signup.service.UtilisateurService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.ApiRest.Login_Signup.service.UtilisateurService;

import java.security.Principal;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
public class UtilisateurControleur {

    private final AuthenticationManager authenticationManager;
    private final UtilisateurService utilisateurService;
    private final JwtService jwtService;

    public UtilisateurControleur(AuthenticationManager authenticationManager, UtilisateurService utilisateurService, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.utilisateurService = utilisateurService;
        this.jwtService = jwtService;
    }

    @PostMapping(path = "inscription")
    public ResponseEntity<?> inscription(@RequestBody Utilisateur utilisateur) {
        log.info("Inscription");
        utilisateurService.inscription(utilisateur);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "connexion")
    public ResponseEntity<?> connexion(@RequestBody AuthentificationDTO authentificationDTO) {
        final Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authentificationDTO.getEmail(), authentificationDTO.getPassword())
        );

        if(authenticate.isAuthenticated()) {
            String token = jwtService.generate(authentificationDTO.getEmail()).toString();
            Utilisateur utilisateur = utilisateurService.getByEmail(authentificationDTO.getEmail());

            ConnexionResponse response = new ConnexionResponse(token, utilisateur);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping(path = "deconnexion")
    public Map<String, String> deconnexion(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        String username = jwtService.extractUsername(token);
        Map<String, String> response = jwtService.generate(username);
        return response;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
        try {
            // Récupérer le token JWT de l'en-tête de la requête
            String token = request.getHeader("Authorization");

            if (token != null && token.startsWith("Bearer ")) {
                // Extraire le token JWT en enlevant "Bearer "
                token = token.substring(7);

                // Extraire le nom d'utilisateur du token JWT
                String username = jwtService.extractUsername(token);

                // Récupérer les informations de l'utilisateur à partir du service
                Utilisateur utilisateur = utilisateurService.getByEmail(username);

                return ResponseEntity.ok(utilisateur);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


@GetMapping(value = "/userinfo")
public ResponseEntity<?> getUserInfo(Principal user){
        Utilisateur utilisateurObj = (Utilisateur)utilisateurService.loadUserByUsername(user.getName());

        Utilisateur userinfo=new Utilisateur();
        userinfo.setEmail(utilisateurObj.getEmail());
        userinfo.setNom(utilisateurObj.getNom());
        userinfo.setPrenom(utilisateurObj.getPrenom());


        return ResponseEntity.ok(userinfo);

}

}

