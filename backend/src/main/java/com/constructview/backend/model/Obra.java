package com.constructview.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "obras")
public class Obra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private Double lat;
    private Double lng;
    private Integer progresso;
    private String construtora;
    private String status;
    private String risco;
    private Integer roi;

    @ElementCollection
    @CollectionTable(name = "obra_fotos", joinColumns = @JoinColumn(name = "obra_id"))
    @Column(name = "foto_url")
    private List<String> fotos;

    @Column(columnDefinition = "TEXT")
    private String evolucao;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario criadoPor;
}