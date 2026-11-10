package com.echosense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record EventoSonoroRequestDto(

        @NotNull(message = "O nível de confiança é obrigatório")
        @DecimalMin(value = "0.0", message = "O nível mínimo de confiança é 0")
        @DecimalMax(value = "100.0", message = "O nível máximo de confiança é 100")
        Double nivelConfianca,

        LocalDateTime dataHora,

        @NotBlank(message = "O tipo de som não pode estar vazio")
        String tipoSom,

        @NotNull(message = "O ID do ambiente é obrigatório")
        Long idAmbiente

) {}