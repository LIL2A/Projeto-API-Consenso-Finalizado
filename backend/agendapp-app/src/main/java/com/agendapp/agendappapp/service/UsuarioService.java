package com.agendapp.agendappapp.service;

//acesso as funçoes e metodos java para fazer as 4 operações do crud
import org.springframework.data.jpa.repository.JpaRepository;
import com.agendapp.agendappapp.model.Usuario;
import java.util.Optional;

//Gera herança com o repositório do springboot 
public interface UsuarioService extends JpaRepository<Usuario, Long> {
    //Método para pesquisar Usuário pelo email 
    Optional<Usuario> findByEmail(String email);
}