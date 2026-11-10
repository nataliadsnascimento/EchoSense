package com.echosense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NotificacaoRequestDto(
        @NotNull(message = "O ID do evento é obrigatório")
        Long idEvento,

        @NotBlank(message = "O título é obrigatório")
        String titulo,

        @NotBlank(message = "A mensagem é obrigatória")
        String mensagem
) {}
