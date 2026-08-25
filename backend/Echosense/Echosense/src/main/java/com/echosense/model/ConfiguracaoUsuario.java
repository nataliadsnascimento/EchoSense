package com.echosense.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.PackagePrivate;

@Entity
@Table(name = "configuracao_usuario")
@Getter
@Setter
@NoArgsConstructor
public class ConfiguracaoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_configuracao")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "id_usuario", nullable = false, unique = true)
    private Usuario usuario;

    @Column(nullable = false)
    private Boolean vibracao = true;

    @Column(nullable = false)
    private Integer volume = 100;

    @Column(length = 30)
    private String tema = "Claro";

    @Column(name = "sons_ativos", columnDefinition = "TEXT")
    private String sonsAtivos;
}
