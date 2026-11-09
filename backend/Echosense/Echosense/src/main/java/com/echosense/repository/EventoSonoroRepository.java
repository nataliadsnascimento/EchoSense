package com.echosense.repository;
import com.echosense.model.EventoSonoro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventoSonoroRepository extends JpaRepository<EventoSonoro, Long>{
    List<EventoSonoro> findByAmbienteIdOrderByDataHoraDesc(Long ambienteId);
    Optional<EventoSonoro> findByIdAndAmbienteId(Long id, Long ambienteId);
}
