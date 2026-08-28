package com.echosense.repository;
import com.echosense.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long>{
    Optional<Notificacao>  findByEventoSonoroId(Long eventoSonoroId);
}
