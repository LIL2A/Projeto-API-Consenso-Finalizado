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

import com.agendapp.agendappapp.model.Agendamento;
import com.agendapp.agendappapp.model.Servico;
import com.agendapp.agendappapp.model.Usuario;
import com.agendapp.agendappapp.service.AgendamentoService;
import com.agendapp.agendappapp.service.ServicoService;
import com.agendapp.agendappapp.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")

public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ServicoService servicoService;

    //Metodo post com obrigatoriedade de passar o IdUsuario e o IdServiço
    @PostMapping("/agendamento")

    //Response Entity permite que eu receba status via html
    public ResponseEntity<Object> CriarNovoAgendamento(@RequestBody Agendamento agendar){
        Usuario user = usuarioService.findById(agendar.getUsuario().getIdUsuario()).get();
        Servico serv = servicoService.findById(agendar.getServico().getIdServico()).get();
        
        //Se o tipo do usuário logado for 1, relativo a cliente o agendamento é salvo, senão retorna mensagem de erro
        if (user.getTipoUsuario().getIdTipoUsuario()==1){
            agendamentoService.save(agendar);
            return ResponseEntity.status(HttpStatus.CREATED).body("Agendamento realizado com sucesso");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro");

    
    }

     @GetMapping("/agendamento")
    public Iterable<Agendamento> obterTodoAgendamentos(){
        return agendamentoService.findAll();
    }
     @GetMapping("/agendamento/{id}") 
    public Agendamento obterAgendamentoPeloId(@PathVariable("id") long Id){ 
        return agendamentoService.findById(Id).get(); 
    }

    @GetMapping("/agendamento/usuario/{id}") 
    public Agendamento obterAgendamentoPeloIdUsuario(@PathVariable("id") long Id){ 
        return agendamentoService.findByusuarioIdUsuario(Id).get(); 
    }

    @DeleteMapping("/agendamento/{id}")
    public String deletarAgendamentoPeloID(@PathVariable("id")long id){
       agendamentoService.deleteById(id);
            return "Agendamento deletado";
    }

    @PutMapping("/agendamento")
    public Agendamento atualizarAgendamento(@RequestBody Agendamento agendamento){ 
        Agendamento agendamentoDB = agendamentoService.findById(agendamento.getIdAgendamento()).get();
        
        agendamentoDB.setData(agendamento.getData());
        agendamentoDB.setHora(agendamento.getHora());
       
        agendamentoDB = agendamentoService.save(agendamentoDB);
            return agendamentoDB;
    }
}