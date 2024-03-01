package com.example.ApiRest.Login_Signup.repository;


import com.example.ApiRest.Login_Signup.entite.Validation;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ValidationRepository extends CrudRepository<Validation, Integer> {

    Optional<Validation> findByCode(String code);
}
