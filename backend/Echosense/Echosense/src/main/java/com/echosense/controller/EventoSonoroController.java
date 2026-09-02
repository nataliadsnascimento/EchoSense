package com.echosense.controller;

import com.echosense.dto.EventoSonoroRequestdto;
import com.echosense.model.EventoSonoro;
import com.echosense.service.EventoSonoroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/eventos")
public class EventoSonoroController {

    private final EventoSonoroService eventoSonoroService;

    public EventoSonoroController(EventoSonoroService eventoSonoroService) {
        this.eventoSonoroService = eventoSonoroService;
    }

    @PostMapping
    public ResponseEntity<EventoSonoro> registrarEvento(@RequestBody EventoSonoroRequestdto dto) {
        EventoSonoro eventoSalvo = eventoSonoroService.registrarEvento(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(eventoSalvo);
    }
}
