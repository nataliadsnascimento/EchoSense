package com.echosense.controller;

import com.echosense.dto.EventoSonoroRequestdto;
import com.echosense.model.EventoSonoro;
import com.echosense.service.EventoSonoroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoSonoroController {

    private final EventoSonoroService eventoSonoroService;

    public EventoSonoroController(EventoSonoroService eventoSonoroService) {
        this.eventoSonoroService = eventoSonoroService;
    }

    @PostMapping
    public ResponseEntity<EventoSonoro> registrarEvento(@RequestBody @Valid EventoSonoroRequestdto dto) {
        EventoSonoro eventoSalvo = eventoSonoroService.registrarEvento(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(eventoSalvo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoSonoro> buscarporId(@PathVariable Long id){
        EventoSonoro evento = eventoSonoroService.buscarPorId(id);
        return ResponseEntity.ok(evento);
    }

    @GetMapping
    public ResponseEntity<List<EventoSonoro>> listarHistorico(){
        List<EventoSonoro> historico = eventoSonoroService.listarHistorico();
        return ResponseEntity.ok(historico);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirEvento(@PathVariable Long id){
        eventoSonoroService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
