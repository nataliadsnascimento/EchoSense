
package com.echosense.dto;

import com.echosense.model.Notificacao;
import java.time.LocalDateTime;

public record NotificacaoResponseDto(
        Long id,
        Long idEvento,
        String titulo,
        String mensagem,
        LocalDateTime dataEnvio,
        Boolean visualizada
) {
    public NotificacaoResponseDto(Notificacao notificacao) {
        this(
                notificacao.getId(),
                notificacao.getEventoSonoro().getId(),
                notificacao.getTitulo(),
                notificacao.getMensagem(),
                notificacao.getDataEnvio(),
                notificacao.getVisualizada()
        );
    }
}
