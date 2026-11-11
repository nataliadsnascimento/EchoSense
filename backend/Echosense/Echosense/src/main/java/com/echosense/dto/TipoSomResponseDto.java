
package com.echosense.dto;

import com.echosense.model.TipoSom;

public record TipoSomResponseDto(

        Long id,
        String nomeSom,
        String categoria,
        String descricao,
        String icone

) {
    public TipoSomResponseDto(TipoSom tipoSom) {
        this(
                tipoSom.getId(),
                tipoSom.getNomeSom(),
                tipoSom.getCategoria(),
                tipoSom.getDescricao(),
                tipoSom.getIcone()
        );
    }
}
