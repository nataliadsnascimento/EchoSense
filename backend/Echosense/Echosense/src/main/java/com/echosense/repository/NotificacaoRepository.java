package com.echosense.repository;

import com.echosense.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    boolean existsByEventoSonoroId(Long idEvento);
}
