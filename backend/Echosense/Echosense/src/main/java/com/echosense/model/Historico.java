package com.echosense.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "historico")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Historico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historico")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_ambiente", nullable = false)
    private Ambiente ambiente;

    @Column(name = "periodo_inicio", nullable = false)
    private LocalDateTime periodoInicio;

    @Column(name = "periodo_fim")
    private LocalDateTime periodoFim;

    @Column(name = "total_eventos")
    private Integer totalEventos;

    @Column(name = "tipo_mais_frequente", length = 100)
    private String tipoMaisFrequente;

    @PrePersist
    protected void aoPersistir(){
        if (this.periodoInicio == null){
            this.periodoInicio = LocalDateTime.now();
        }
    }
}