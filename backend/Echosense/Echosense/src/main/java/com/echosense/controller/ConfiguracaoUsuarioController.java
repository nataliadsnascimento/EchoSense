package com.echosense.controller;

import com.echosense.dto.ConfiguracaoUsuarioRequestDto;
import com.echosense.dto.ConfiguracaoUsuarioResponseDto;
import com.echosense.model.ConfiguracaoUsuario;
import com.echosense.service.ConfiguracaoUsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/configuracoes")
public class ConfiguracaoUsuarioController {

    private final ConfiguracaoUsuarioService service;

    public ConfiguracaoUsuarioController(ConfiguracaoUsuarioService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ConfiguracaoUsuarioResponseDto> criarConfiguracao(@RequestBody @Valid ConfiguracaoUsuarioRequestDto dto) {
        ConfiguracaoUsuario config = service.criarConfiguracao(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ConfiguracaoUsuarioResponseDto(config));
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<ConfiguracaoUsuarioResponseDto> buscarConfiguracao(@PathVariable Long idUsuario) {
        ConfiguracaoUsuario config = service.buscarPorUsuario(idUsuario);
        return ResponseEntity.ok(new ConfiguracaoUsuarioResponseDto(config));
    }

    @PutMapping("/usuario/{idUsuario}")
    public ResponseEntity<ConfiguracaoUsuarioResponseDto> atualizarConfiguracao(
            @PathVariable Long idUsuario,
            @RequestBody ConfiguracaoUsuarioRequestDto dto) {

        ConfiguracaoUsuario configAtualizada = service.atualizarConfiguracao(idUsuario, dto);
        return ResponseEntity.ok(new ConfiguracaoUsuarioResponseDto(configAtualizada));
    }
}