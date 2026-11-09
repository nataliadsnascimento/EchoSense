package com.echosense.controller;

import com.echosense.dto.AmbienteRequestDto;
import com.echosense.dto.AmbienteResponseDto;
import com.echosense.model.Ambiente;
import com.echosense.service.AmbienteService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ambientes")
public class AmbienteController {

    private final AmbienteService ambienteService;

    public AmbienteController(AmbienteService ambienteService) {
        this.ambienteService = ambienteService;
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<AmbienteResponseDto>> listarPorUsuario(@PathVariable Long usuarioId) {

        List<AmbienteResponseDto> ambientes =
                ambienteService.listarPorUsuario(usuarioId)
                        .stream()
                        .map(AmbienteResponseDto::new)
                        .toList();

        return ResponseEntity.ok(ambientes);
    }

    @PostMapping
    public ResponseEntity<AmbienteResponseDto> criarAmbiente(@RequestBody @Valid AmbienteRequestDto dto) {

        Ambiente ambiente = ambienteService.criarAmbiente(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AmbienteResponseDto(ambiente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AmbienteResponseDto> atualizarAmbiente(@PathVariable Long id, @RequestBody @Valid AmbienteRequestDto dto) {

        Ambiente ambiente = ambienteService.atualizarAmbiente(id, dto);

        return ResponseEntity.ok(new AmbienteResponseDto(ambiente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAmbiente(@PathVariable Long id) {

        ambienteService.deletarAmbiente(id);

        return ResponseEntity.noContent().build();
    }
}