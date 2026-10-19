package com.echosense.controller;

import com.echosense.model.Ambiente;
import com.echosense.service.AmbienteService;
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
    public ResponseEntity<List<Ambiente>> listarPorUsuario(@PathVariable Long usuarioId) {
        List<Ambiente> ambientes = ambienteService.listarPorUsuario(usuarioId);
        return ResponseEntity.ok(ambientes);
    }

    @PostMapping
    public ResponseEntity<Ambiente> criarAmbiente(@RequestBody Ambiente ambiente) {
        Ambiente salvo = ambienteService.criarAmbiente(ambiente);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ambiente> atualizarAmbiente(@PathVariable Long id, @RequestBody Ambiente ambienteAtualizado) {
        Ambiente ambiente = ambienteService.atualizarAmbiente(id, ambienteAtualizado);
        return ResponseEntity.ok(ambiente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAmbiente(@PathVariable Long id) {
        ambienteService.deletarAmbiente(id);
        return ResponseEntity.noContent().build();
    }
}