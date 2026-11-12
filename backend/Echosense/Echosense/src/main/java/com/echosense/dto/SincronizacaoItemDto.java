package com.echosense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import java.time.LocalDateTime;
import java.util.UUID;

public record SincronizacaoItemDto (

    @NotNull(message = "O id não pode estar vazio!")
    UUID id,

    @NotBlank(message = "O tipo de registro não pode estar vazio!")
    String registro,

    @NotNull(message = "A data de alteração é obrigatória!")
    @PastOrPresent
    LocalDateTime dataAlteracao

) {}
