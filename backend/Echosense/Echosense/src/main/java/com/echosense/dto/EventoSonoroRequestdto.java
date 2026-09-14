package com.echosense.dto;

import java.time.LocalDateTime;

public class EventoSonoroRequestdto {

    private String tipoSom;
    private Double nivelConfianca;
    private LocalDateTime dataHora;

    public EventoSonoroRequestdto() {}

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