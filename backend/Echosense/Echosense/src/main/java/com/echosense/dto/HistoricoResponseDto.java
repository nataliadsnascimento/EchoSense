
package com.echosense.dto;

import com.echosense.model.Historico;
import java.time.LocalDateTime;

public record HistoricoResponseDto(

        Long id,
        Long idAmbiente,
        LocalDateTime periodoInicio,
        LocalDateTime periodoFim,
        Integer totalEventos,
        String tipoMaisFrequente

) {
    public HistoricoResponseDto(Historico historico) {
        this(
                historico.getId(),
                historico.getAmbiente().getId(),
                historico.getPeriodoInicio(),
                historico.getPeriodoFim(),
                historico.getTotalEventos(),
                historico.getTipoMaisFrequente()
        );
    }
}
