package com.echosense.dto;

import com.echosense.model.Ambiente;

public record AmbienteResponseDto(
        Long id,
        String nomeAmbiente,
        String tipoAmbiente,
        Long idUsuario,
        Long idConfiguracao
) {
    public AmbienteResponseDto(Ambiente ambiente) {
        this(
                ambiente.getId(),
                ambiente.getNomeAmbiente(),
                ambiente.getTipoAmbiente(),
                ambiente.getUsuario().getId(),
                ambiente.getConfiguracao().getId()
        );
    }
}