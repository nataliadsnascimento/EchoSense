package com.echosense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AmbienteRequestDto(
        @NotBlank(message = "O nome do ambiente é obrigatório")
        String nomeAmbiente,

        @NotBlank(message = "O tipo do ambiente é obrigatório")
        String tipoAmbiente,

        @NotNull(message = "O ID do usuário é obrigatório")
        Long idUsuario,

        @NotNull(message = "O ID da configuração é obrigatório")
        Long idConfiguracao
) {}