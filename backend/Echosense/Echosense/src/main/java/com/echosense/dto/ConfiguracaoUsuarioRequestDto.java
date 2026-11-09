package com.echosense.dto;

import jakarta.validation.constraints.NotNull;

public record ConfiguracaoUsuarioRequestDto(
        @NotNull(message = "O ID do usuário é obrigatório")
        Long idUsuario,
        Boolean vibracao,
        Integer volume,
        String tema,
        String sonsAtivos
) {}