package com.agendapp.agendappapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.agendapp.agendappapp.model.Login;
import com.agendapp.agendappapp.model.Usuario;
import com.agendapp.agendappapp.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")

public class LoginController {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Object> credenciais(@RequestBody Login login) {

        //Verificação se email conta no banco
        try {
            Usuario verificacaoEmail = usuarioService.findByEmail(login.getEmail()).get();
            if (verificacaoEmail.getSenha().equals(login.getSenha())) {
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(verificacaoEmail);
            } else {
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Login Errado");
            }
        } catch (RuntimeException erroLogin) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erroLogin.getMessage());
        }

    }

}