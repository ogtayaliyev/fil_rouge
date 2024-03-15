package com.example.ApiRest.Login_Signup.controleur;

import com.example.ApiRest.Login_Signup.dto.AuthentificationDTO;
import com.example.ApiRest.Login_Signup.entite.Utilisateur;
import com.example.ApiRest.Login_Signup.securite.JwtService;
import com.example.ApiRest.Login_Signup.service.UtilisateurService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping
public class UtilisateurControleur {

    private final AuthenticationManager authenticationManager;
    private final UtilisateurService utilisateurService;
    private final JwtService jwtService;

    public UtilisateurControleur(AuthenticationManager authenticationManager, UtilisateurService utilisateurService, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.utilisateurService = utilisateurService;
        this.jwtService = jwtService;
    }

    @PostMapping(path = "inscription",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> inscription(@RequestBody Utilisateur utilisateur) {
        log.info("Inscription");
        utilisateurService.inscription(utilisateur);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "connexion",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity connexion(@RequestBody AuthentificationDTO authentificationDTO) {
        final Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authentificationDTO.getEmail(), authentificationDTO.getPassword())
        );

        if(authenticate.isAuthenticated()) {
            Map<String,String> token = jwtService.generate(authentificationDTO.getEmail());
//            Utilisateur utilisateur = utilisateurService.getByEmail(authentificationDTO.getEmail());

//            ConnexionResponse response = new ConnexionResponse(token, utilisateur);
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping(path = "profil")
    public ResponseEntity<?> profil() {
        Utilisateur utilisateur = (Utilisateur) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (utilisateur != null) {
            return ResponseEntity.ok(utilisateur);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping(path = "deconnexion")
    public Map<String, String> deconnexion(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        String username = jwtService.extractUsername(token);
        Map<String, String> response = jwtService.generate(username);
        return response;
    }


}

