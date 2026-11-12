package com.echosense.repository;

import com.echosense.dto.SincronizacaoItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class EventoOfflineBatchRepositoryImpl
        implements EventoOfflineBatchRepository {

    private final JdbcTemplate jdbcTemplate;

    private static final String SQL = """
        INSERT INTO evento_offline (id, registro, data_alteracao)
        VALUES (?, ?, ?)
        ON CONFLICT (id) DO UPDATE
        SET registro = EXCLUDED.registro,
            data_alteracao = EXCLUDED.data_alteracao
        WHERE EXCLUDED.data_alteracao > evento_offline.data_alteracao
        """;

    @Override
    public void upsertEventos(List<SincronizacaoItemDto> lote) {

        if (lote == null || lote.isEmpty()) {
            return;
        }

        jdbcTemplate.batchUpdate( SQL,  lote, 100, (ps, item) -> {
                    ps.setObject(1, item.id());
                    ps.setString(2, item.registro());
                    ps.setTimestamp(
                            3,
                            Timestamp.valueOf(item.dataAlteracao())
                    );
                }
        );
    }
}
