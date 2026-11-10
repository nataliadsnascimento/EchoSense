
package com.echosense.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record HistoricoRequestDto(

        @NotNull(message = "O ID do ambiente é obrigatório")
        Long idAmbiente,

        @NotNull(message = "O início do período é obrigatório")
        LocalDateTime periodoInicio,

        @NotNull(message = "O fim do período é obrigatório")
        LocalDateTime periodoFim

) {}
