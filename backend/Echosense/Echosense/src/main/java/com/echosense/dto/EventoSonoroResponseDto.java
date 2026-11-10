package com.echosense.dto;

import com.echosense.model.EventoSonoro;
import java.time.LocalDateTime;

public record EventoSonoroResponseDto(
        Long id,
        Double confianca,
        LocalDateTime dataHora,
        String status,
        String feedback,
        Long idAmbiente,
        Long idUsuario
) {
    public EventoSonoroResponseDto(EventoSonoro evento) {
        this(
                evento.getId(),
                evento.getConfianca(),
                evento.getDataHora(),
                evento.getStatus() != null ? evento.getStatus().name() : null,
                evento.getFeedback() != null ? evento.getFeedback().name() : null,
                evento.getAmbiente() != null ? evento.getAmbiente().getId() : null,
                evento.getUsuario() != null ? evento.getUsuario().getId() : null
        );
    }
}