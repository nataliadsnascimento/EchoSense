package com.echosense.repository;
import com.echosense.model.EventoSonoro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventoSonoroRepository extends JpaRepository<EventoSonoro, Long>{
    List<EventoSonoro> findByUsuarioIdOrderByDataHoraDesc(Long usuarioId);
    Optional<EventoSonoro> findByIdAndUsuarioId(Long id, Long usuarioId);
}
