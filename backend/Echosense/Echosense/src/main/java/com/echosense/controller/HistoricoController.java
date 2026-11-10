package com.echosense.controller;

import com.echosense.dto.HistoricoRequestDto;
import com.echosense.dto.HistoricoResponseDto;
import com.echosense.model.Historico;
import com.echosense.service.HistoricoService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historicos")
public class HistoricoController {

    private final HistoricoService historicoService;

    public HistoricoController(HistoricoService historicoService) {
        this.historicoService = historicoService;
    }

    @PostMapping
    public ResponseEntity<HistoricoResponseDto> gerarHistorico(
            @RequestBody @Valid HistoricoRequestDto dto) {

        Historico salvo = historicoService.gerarHistorico(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new HistoricoResponseDto(salvo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoricoResponseDto> buscarPorId(
            @PathVariable Long id) {

        Historico historico = historicoService.buscarPorId(id);

        return ResponseEntity.ok(
                new HistoricoResponseDto(historico)
        );
    }

    @GetMapping("/ambiente/{ambienteId}")
    public ResponseEntity<List<HistoricoResponseDto>> listarPorAmbiente(
            @PathVariable Long ambienteId) {

        List<HistoricoResponseDto> historicos = historicoService
                .listarPorAmbiente(ambienteId)
                .stream()
                .map(HistoricoResponseDto::new)
                .toList();

        return ResponseEntity.ok(historicos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        historicoService.excluir(id);

        return ResponseEntity.noContent().build();
    }
}
