package com.develcode.cadastro.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;


@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long code;

    private String name;
    private LocalDate birthDate;
    private String photo;

    public User(String name, LocalDate birthDate, String photo) {
        this.name = name;
        this.birthDate = birthDate;
        this.photo = photo;
    }

    public User(String name, LocalDate birthDate) {
        this.name = name;
        this.birthDate = birthDate;
    }
}
