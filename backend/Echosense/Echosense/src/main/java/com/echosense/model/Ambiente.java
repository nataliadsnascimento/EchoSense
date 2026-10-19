package com.echosense.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "ambiente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ambiente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ambiente")
    private Long id;

    @Column(name = "nome_ambiente", nullable = false, length = 100)
    private String nomeAmbiente;

    @Column(name = "tipo_ambiente", nullable = false)
    private String tipoAmbiente;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_configuracao", nullable = false)
    private ConfiguracaoUsuario configuracaoUsuario;

    @OneToMany(mappedBy = "ambiente", cascade = CascadeType.ALL)
    private List<EventoSonoro> eventos;

    @OneToMany(mappedBy = "ambiente", cascade = CascadeType.ALL)
    private List<Historico> historicos;
}
