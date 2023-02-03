package com.agendapp.agendappapp.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data 
@Entity 
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 

    private Long idUsuario; 

    //Busca o id do usuário logado para adicionar a tabela agendamento
    @Column(nullable = false)
    @NotBlank
    private String nome; 

    @Column(nullable = false)
    @NotBlank
    private String sobrenome;

    @Column(unique = true, nullable = false)
    @Email
    private String email;

    @Column(nullable = false)
    private String senha;

    @OneToOne
    private TipoUsuario tipoUsuario;


}
