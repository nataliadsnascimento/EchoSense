package com.echosense.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tipo_som")
@Getter
@Setter
@NoArgsConstructor
public class TipoSom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo")
    private Long id;

    @Column(name = "nome_som", nullable = false, length = 100)
    private String nomeSom;

    @Column(nullable = false, length = 50)
    private String categoria;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(length = 100)
    private String icone;
}
