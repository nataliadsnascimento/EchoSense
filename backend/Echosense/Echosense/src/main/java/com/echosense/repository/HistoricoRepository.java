package com.echosense.repository;
import com.echosense.model.Historico;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoricoRepository extends JpaRepository<Historico, Long>{
    List<Historico> findByUsuarioIdOrderByDataHoraDesc(Long usuarioId);
    List<Historico> findByEventoSonoroId(Long eventoSonoroId);
}
