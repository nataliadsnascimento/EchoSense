package com.echosense.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "evento_sonoro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventoSonoro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    private Long Id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_ambiente", nullable = false)
    private Ambiente ambiente;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_tipo", nullable = false)
    private TipoSom tipoSom;

    @Column(nullable = false)
    private Double confianca;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private StatusEvento status = StatusEvento.NOVO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private FeedbackEvento feedback = FeedbackEvento.AGUARDANDO;

    @OneToOne(mappedBy = "eventoSonoro", cascade = CascadeType.ALL)
    private Notificacao notificacao;

    @PrePersist
    protected void aoPersistir(){
        if (this.dataHora == null){
            this.dataHora = LocalDateTime.now();
        }
    }
}
