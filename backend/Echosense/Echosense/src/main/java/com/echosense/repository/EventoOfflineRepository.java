package com.echosense.repository;

import com.echosense.model.EventoOffline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface EventoOfflineRepository extends JpaRepository <EventoOffline, UUID>,
        EventoOfflineBatchRepository {
}
