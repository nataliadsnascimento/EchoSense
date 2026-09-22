package com.echosense.controller;

import com.echosense.dto.SincronizacaoItemDto;
import com.echosense.service.SincronizacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/sincronizacao")
public class SincronizacaoController {

    @Autowired
    private SincronizacaoService sincronizacaoService;

    @PostMapping
    public ResponseEntity<String> sincronizar (@RequestBody List<@Valid SincronizacaoItemDto> lote){
        sincronizacaoService.processarSincronizacao(lote);
        return ResponseEntity.ok("Sincronização realizada com sucesso!");
    }
}
