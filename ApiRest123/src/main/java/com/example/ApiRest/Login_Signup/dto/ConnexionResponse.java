package com.example.ApiRest.Login_Signup.dto;

import com.example.ApiRest.Login_Signup.entite.Utilisateur;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConnexionResponse {
    private String token;
    private Utilisateur utilisateur;

    public ConnexionResponse(String token, Utilisateur utilisateur) {
        this.token = token;
        this.utilisateur = utilisateur;
    }

    public ConnexionResponse() {

    }
}
