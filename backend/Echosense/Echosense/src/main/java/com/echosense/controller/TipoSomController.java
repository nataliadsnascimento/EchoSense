
package com.echosense.controller;

import com.echosense.dto.TipoSomRequestDto;
import com.echosense.dto.TipoSomResponseDto;
import com.echosense.model.TipoSom;
import com.echosense.service.TipoSomService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-sons")
public class TipoSomController {

    private final TipoSomService tipoSomService;

    public TipoSomController(TipoSomService tipoSomService) {
        this.tipoSomService = tipoSomService;
    }

    @PostMapping
    public ResponseEntity<TipoSomResponseDto> criar(@RequestBody @Valid TipoSomRequestDto dto) {

        TipoSom salvo = tipoSomService.criar(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new TipoSomResponseDto(salvo));
    }

    @GetMapping
    public ResponseEntity<List<TipoSomResponseDto>> listarTodos() {

        List<TipoSomResponseDto> tipos = tipoSomService
                .listarTodos()
                .stream()
                .map(TipoSomResponseDto::new)
                .toList();

        return ResponseEntity.ok(tipos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoSomResponseDto> buscarPorId(@PathVariable Long id) {

        TipoSom tipoSom = tipoSomService.buscarPorId(id);

        return ResponseEntity.ok(
                new TipoSomResponseDto(tipoSom)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoSomResponseDto> atualizar(@PathVariable Long id, @RequestBody @Valid TipoSomRequestDto dto) {

        TipoSom atualizado = tipoSomService.atualizar(id, dto);

        return ResponseEntity.ok(
                new TipoSomResponseDto(atualizado)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        tipoSomService.excluir(id);

        return ResponseEntity.noContent().build();
    }
}
