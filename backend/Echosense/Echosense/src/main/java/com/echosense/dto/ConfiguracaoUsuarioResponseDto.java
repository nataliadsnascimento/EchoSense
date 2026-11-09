package com.echosense.dto;

import com.echosense.model.ConfiguracaoUsuario;

public record ConfiguracaoUsuarioResponseDto(
        Long id,
        Long idUsuario,
        Boolean vibracao,
        Integer volume,
        String tema,
        String sonsAtivos
) {
    public ConfiguracaoUsuarioResponseDto(ConfiguracaoUsuario config) {
        this(
                config.getId(),
                config.getUsuario() != null ? config.getUsuario().getId() : null,
                config.getVibracao(),
                config.getVolume(),
                config.getTema(),
                config.getSonsAtivos()
        );
    }
}