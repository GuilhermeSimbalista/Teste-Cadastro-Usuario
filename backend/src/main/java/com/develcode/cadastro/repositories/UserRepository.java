package com.develcode.cadastro.repositories;

import com.develcode.cadastro.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
