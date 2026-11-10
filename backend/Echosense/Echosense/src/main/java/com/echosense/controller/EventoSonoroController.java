package com.echosense.controller;

import com.echosense.dto.EventoSonoroRequestdto;
import com.echosense.dto.EventoSonoroResponseDto;
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
    public ResponseEntity<EventoSonoroResponseDto> registrarEvento(@RequestBody @Valid EventoSonoroRequestdto dto) {
        EventoSonoro eventoSalvo = eventoSonoroService.registrarEvento(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new EventoSonoroResponseDto(eventoSalvo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoSonoroResponseDto> buscarporId(@PathVariable Long id){
        EventoSonoro evento = eventoSonoroService.buscarPorId(id);
        return ResponseEntity.ok(new EventoSonoroResponseDto(evento));
    }

    @GetMapping
    public ResponseEntity<List<EventoSonoroResponseDto>> listarHistorico(){
        List<EventoSonoro> historico = eventoSonoroService.listarHistorico();

        List<EventoSonoroResponseDto> historicoDto = historico.stream()
                .map(EventoSonoroResponseDto::new)
                .toList();

        return ResponseEntity.ok(historicoDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirEvento(@PathVariable Long id){
        eventoSonoroService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/feedback")
    public ResponseEntity<String> darFeedback(@PathVariable Long id, @RequestParam String feedback) {
        eventoSonoroService.atualizarFeedback(id, feedback);
        return ResponseEntity.ok("Feedback registrado com sucesso!");
    }
}