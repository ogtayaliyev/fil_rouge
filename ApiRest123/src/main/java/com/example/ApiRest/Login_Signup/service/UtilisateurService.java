package com.example.ApiRest.Login_Signup.service;


import com.example.ApiRest.Login_Signup.TypeDeRole;
import com.example.ApiRest.Login_Signup.entite.Role;
import com.example.ApiRest.Login_Signup.entite.Utilisateur;
import com.example.ApiRest.Login_Signup.repository.UtilisateurRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.Instant;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UtilisateurService implements UserDetailsService {
    private UtilisateurRepository utilisateurRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public void inscription(Utilisateur utilisateur) {

        if(!utilisateur.getEmail().contains("@")) {
            throw  new RuntimeException("Votre mail invalide");
        }
        if(!utilisateur.getEmail().contains(".")) {
            throw  new RuntimeException("Votre mail invalide");
        }
        utilisateur.setActif(Boolean.TRUE);
        Optional<Utilisateur> utilisateurOptional = this.utilisateurRepository.findByEmail(utilisateur.getEmail());
        if(utilisateurOptional.isPresent()) {
            throw  new RuntimeException("Votre mail est déjà utilisé");
        }
        String mdpCrypte = this.passwordEncoder.encode(utilisateur.getPassword());
        utilisateur.setPassword(mdpCrypte);

        Role roleUtilisateur = new Role();
        roleUtilisateur.setLibelle(TypeDeRole.UTILISATEUR);
        utilisateur.setRole(roleUtilisateur);

        utilisateur = this.utilisateurRepository.save(utilisateur);

    }


    @Override
    public Utilisateur loadUserByUsername(String email) throws UsernameNotFoundException {
        return this.utilisateurRepository
                .findByEmail(email)
                .orElseThrow(() -> new  UsernameNotFoundException("Aucun utilisateur ne corespond à cet identifiant"));
    }

    public Optional<Utilisateur> findByEmail(String emailUtilisateur) {
        return this.utilisateurRepository.findByEmail(emailUtilisateur);
    }

    public Utilisateur getByEmail(String email) {
        return this.utilisateurRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Aucun utilisateur ne correspond à cet email"));
    }


}
