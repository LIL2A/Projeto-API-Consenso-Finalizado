package com.agendapp.agendappapp.service;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.agendapp.agendappapp.model.Servico;

//Gera herança com o repositório do springboot
public interface ServicoService extends JpaRepository<Servico,Long>{  
    
    //Query para puxar o serviço pelo id do usuário no método get do ServicoController
    @Query("Select a FROM Servico a WHERE a.usuario = :idUsuario")
    public List<Servico> findByUsuarioId(@Param("idUsuario") Long id);

    Optional<Servico>findByusuarioIdUsuario(Long id);

}
