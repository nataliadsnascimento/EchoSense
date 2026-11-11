
package com.echosense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TipoSomRequestDto(

        @NotBlank(message = "O nome do som é obrigatório")
        @Size(max = 100)
        String nomeSom,

        @NotBlank(message = "A categoria é obrigatória")
        @Size(max = 50)
        String categoria,

        String descricao,

        @Size(max = 100)
        String icone

) {}
