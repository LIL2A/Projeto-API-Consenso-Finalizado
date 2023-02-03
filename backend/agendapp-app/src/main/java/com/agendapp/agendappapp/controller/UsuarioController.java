package com.agendapp.agendappapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.agendapp.agendappapp.model.Usuario;
import com.agendapp.agendappapp.service.TipoUsuarioService;
import com.agendapp.agendappapp.service.UsuarioService;

import jakarta.validation.Valid;

import com.agendapp.agendappapp.model.TipoUsuario;


@RestController
@CrossOrigin(origins = "*")

public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired TipoUsuarioService tipoUsuarioService;


    //Metodo Post com validação das anotações adicionadas ao model.
    @PostMapping("/usuario")
    public ResponseEntity<Object> criarNovoUsuario(@RequestBody @Valid Usuario usuario) {

        try {

            if (usuario.getTipoUsuario().getIdTipoUsuario() == 1 || usuario.getTipoUsuario().getIdTipoUsuario() == 2) {
                usuarioService.save(usuario);
                return ResponseEntity.status(HttpStatus.CREATED).body("Usuário criado com sucesso");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar usuário");
        }

    }

    @GetMapping("/usuario")
    public Iterable<Usuario> obterTodoUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Object> obterUsuarioPeloId(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findById(id).get());
        } catch (RuntimeException erro) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id usuário não encontrado");

        }
    }

    @DeleteMapping("/usuario/{id}")
    public String deletarUsuariooPeloID(@PathVariable("id") long id) {
        usuarioService.deleteById(id);
        return "Usuário deletado";
    }


        @PutMapping("/usuario")
        public Usuario atualizarUsuario(@RequestBody Usuario usuario){ 
            Usuario usuarioDb = usuarioService.findById(usuario.getIdUsuario()).get();
            
            usuarioDb.setNome(usuario.getNome());
            usuarioDb.setSobrenome(usuario.getSobrenome());
            usuarioDb.setEmail(usuario.getEmail());
            usuarioDb.setSenha(usuario.getSenha());

            TipoUsuario tipoUsuario = tipoUsuarioService.findById(usuario.getTipoUsuario().getIdTipoUsuario()).get();

            usuarioDb.setTipoUsuario(tipoUsuario);
            usuarioDb = usuarioService.save(usuarioDb);
    
            return usuarioDb;
        }
    }

      
