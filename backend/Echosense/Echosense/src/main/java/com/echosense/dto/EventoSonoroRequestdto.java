package com.echosense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class EventoSonoroRequestdto {

    @NotNull(message = "O nível de confiança é obrigatório")
    @Min(value = 0, message = "O nível mínimo de confiança é 0")
    @Max(value = 100, message = "O nível máximo de confiança é 100")
    private Double nivelConfianca;

    private LocalDateTime dataHora;

    @NotBlank(message = "O tipo de som não pode estar vazio")
    private String tipoSom;

    public String getTipoSom() {
        return tipoSom;
    }

    public void setTipoSom(String tipoSom) {
        this.tipoSom = tipoSom;
    }

    public Double getNivelConfianca() {
        return nivelConfianca;
    }

    public void setNivelConfianca(Double nivelConfianca) {
        this.nivelConfianca = nivelConfianca;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
}