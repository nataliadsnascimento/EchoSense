package com.echosense.repository;

import com.echosense.model.EventoOffline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface EventoOfflineRepository extends JpaRepository <EventoOffline, UUID>{

    @Modifying
    @Query (value = "INSERT INTO evento_offline (id, registro, data_alteracao) " +
                     "VALUES (:id, :registro, :dataAlteracao) " +
                     "ON CONFLICT (id) DO UPDATE " +
                     "SET registro = EXCLUDED.registro, " +
                     "  data_alteracao = EXCLUDED.data_alteracao " +
                     "WHERE EXCLUDED.data_alteracao > evento_offline.data_alteracao", nativeQuery = true)

    void upsertEvento (@Param("id") UUID id,
                       @Param("registro") String registro,
                       @Param("dataAlteracao") LocalDateTime dataAlteracao);

}
