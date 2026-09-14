package com.echosense.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "evento_sonoro")
@Getter
@Setter
@NoArgsConstructor
public class EventoSonoro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    private Long Id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_tipo", nullable = false)
    private TipoSom tipoSom;

    @Column(nullable = false)
    private Double confianca;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private StatusEvento status = StatusEvento.NOVO;

    @PrePersist
    protected void aoPersistir(){
        if (this.dataHora == null){
            this.dataHora = LocalDateTime.now();
        }
    }
}
