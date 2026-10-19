package com.echosense.repository;

import com.echosense.model.Ambiente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AmbienteRepository extends JpaRepository <Ambiente, Long> {
    List<Ambiente> findByUsuarioId(Long usuarioId);
}
