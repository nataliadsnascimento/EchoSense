package com.echosense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class SincronizacaoItemDto {

    @NotNull(message = "O id não pode estar vazio!")
    private UUID id;

    @NotBlank(message = "O tipo de registro não pode estar vazio!")
    private String registro;

    @NotNull(message = "A data de alteração é obrigatória!")
    @PastOrPresent
    private LocalDateTime dataAlteracao;
}
