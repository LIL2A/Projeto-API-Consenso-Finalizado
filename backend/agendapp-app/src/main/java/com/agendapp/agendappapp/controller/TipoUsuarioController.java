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

import com.agendapp.agendappapp.model.TipoUsuario;
import com.agendapp.agendappapp.service.TipoUsuarioService;

@RestController
@CrossOrigin(origins = "*")

public class TipoUsuarioController {

    @Autowired
    private TipoUsuarioService tipoUsuarioService;

    @PostMapping("/tipousuario")
    public ResponseEntity<Object> criarNovoTipoUsuario(@RequestBody TipoUsuario tipoUsuario) {
        //Validação para que o tipo de usuário seja cliente ou prestador para que seja salvo
        try {
            if (tipoUsuario.getNome().equalsIgnoreCase("cliente") || tipoUsuario.getNome().equals("prestador")) {
                tipoUsuarioService.save(tipoUsuario);
                return ResponseEntity.status(HttpStatus.CREATED).body(tipoUsuario);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de usuário inválido");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/tipousuario")
    public Iterable<TipoUsuario> obterTodoTipoUsuarios() {
        return tipoUsuarioService.findAll();
    }

    @GetMapping("/tipousuario/{id}")
    public ResponseEntity<Object> obterUsuarioPeloId(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(tipoUsuarioService.findById(id).get());
        } catch (RuntimeException erro) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tipo de Usuário não localizado");
        }
    }

    @DeleteMapping("/tipousuario/{id}")
    public String deletarTipoUsuariooPeloID(@PathVariable("id") long id) {
        tipoUsuarioService.deleteById(id);
        return "TipoUsuário deletado";
    }

    @PutMapping("/tipousuario")
    public TipoUsuario atualizarTipoUsuario(@RequestBody TipoUsuario tipoUsuario) {
        TipoUsuario tipoUsuarioDb = tipoUsuarioService.findById(tipoUsuario.getIdTipoUsuario()).get();

        tipoUsuarioDb.setNome(tipoUsuario.getNome());

        tipoUsuarioDb = tipoUsuarioService.save(tipoUsuarioDb);
        return tipoUsuarioDb;
    }

}
