package com.agendapp.agendappapp.service;

import org.springframework.data.jpa.repository.JpaRepository;
import com.agendapp.agendappapp.model.TipoUsuario;

//Gera herança com o repositório do springboot
public interface TipoUsuarioService extends JpaRepository<TipoUsuario,Long>{  

    
}
