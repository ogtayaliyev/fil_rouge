package com.example.ApiRest.Login_Signup.repository;




import com.example.ApiRest.Login_Signup.entite.Utilisateur;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UtilisateurRepository extends CrudRepository<Utilisateur, Integer> {
    Optional<Utilisateur> findByEmail(String email);


}
