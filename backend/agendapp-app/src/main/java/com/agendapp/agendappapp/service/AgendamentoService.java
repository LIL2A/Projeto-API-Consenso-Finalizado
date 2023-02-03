package com.agendapp.agendappapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.agendapp.agendappapp.model.Agendamento;

//Gera herança com o repositório do springboot
public interface AgendamentoService extends JpaRepository<Agendamento, Long> {

   //Busca o id do usuário logado para adicionar a tabela agendamento
   @Query("Select a FROM Agendamento a WHERE a.usuario = :idUsuario")
   public List<Agendamento> findByUsuarioId(@Param("idUsuario") Long id);

   Optional<Agendamento>findByusuarioIdUsuario(Long id);



}
