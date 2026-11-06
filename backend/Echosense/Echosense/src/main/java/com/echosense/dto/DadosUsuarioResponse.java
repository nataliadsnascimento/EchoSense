package com.echosense.dto;

import java.time.LocalDateTime;

public record DadosUsuarioResponse(
        Long id,
        String nome,
        String sobrenome,
        String email,
        LocalDateTime dataCadastro
) {}