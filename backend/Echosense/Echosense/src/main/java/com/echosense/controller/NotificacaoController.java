package com.echosense.controller;

import com.echosense.dto.NotificacaoRequestDto;
import com.echosense.dto.NotificacaoResponseDto;
import com.echosense.model.Notificacao;
import com.echosense.service.NotificacaoService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notificacoes")
public class NotificacaoController {

    private final NotificacaoService service;

    public NotificacaoController(NotificacaoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<NotificacaoResponseDto> criar(
            @RequestBody @Valid NotificacaoRequestDto dto) {

        Notificacao notificacao = service.criar(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new NotificacaoResponseDto(notificacao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificacaoResponseDto> buscarPorId(
            @PathVariable Long id) {

        Notificacao notificacao = service.buscarPorId(id);

        return ResponseEntity.ok(
                new NotificacaoResponseDto(notificacao)
        );
    }

    @PutMapping("/{id}/visualizar")
    public ResponseEntity<NotificacaoResponseDto> visualizar(
            @PathVariable Long id) {

        Notificacao notificacao =
                service.marcarComoVisualizada(id);

        return ResponseEntity.ok(
                new NotificacaoResponseDto(notificacao)
        );
    }
}
