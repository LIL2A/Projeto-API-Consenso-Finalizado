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

import com.agendapp.agendappapp.model.Servico;
import com.agendapp.agendappapp.model.Usuario;
import com.agendapp.agendappapp.service.ServicoService;
import com.agendapp.agendappapp.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")


public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @Autowired
    private UsuarioService usuarioservice;

    @PostMapping("/servico")
    public ResponseEntity<Object> criarNovoServico(@RequestBody Servico servico) {
        Usuario user = usuarioservice.findById(servico.getUsuario().getIdUsuario()).get();

        if (user.getTipoUsuario().getIdTipoUsuario() == 2) {
            servicoService.save(servico);
            return ResponseEntity.status(HttpStatus.CREATED).body("Serviço Cadastrado");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao cadastrar serviço. Tipo de usuário inválido");

    }

    @GetMapping("/servico")
    public Iterable<Servico> obterTodoServicos() {
        return servicoService.findAll();
    }

    @GetMapping("/servico/{id}")
    public ResponseEntity<Object> obterServicoPeloId(@PathVariable("id") long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicoService.findById(id).get());
        } catch (RuntimeException erro) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro.getMessage());

        }

    }

    @DeleteMapping("/servico/{id}")
    public String deletarServicoPeloID(@PathVariable("id") long id) {
        servicoService.deleteById(id);
        return "Serviço deletado";
    }

    @GetMapping("/servico/usuario/{id}") 
    public Servico obterServicoPeloIdUsuario(@PathVariable("id") long Id){ 
        return servicoService.findByusuarioIdUsuario(Id).get(); 
    }

    @PutMapping("/servico")
    public Servico atualizarServico(@RequestBody Servico servico) {
        Servico servicoDB = servicoService.findById(servico.getIdServico()).get();

        servicoDB.setNome(servico.getNome());
        servicoDB.setDescricao(servico.getDescricao());

        servicoDB = servicoService.save(servicoDB);
        return servicoDB;
    }

}
