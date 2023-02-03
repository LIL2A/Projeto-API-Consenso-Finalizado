package com.agendapp.agendappapp.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;

public class Login {
    @Column(nullable = false)
    @Email
    private String email;

    @Column(nullable = false)
    private String senha;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

}