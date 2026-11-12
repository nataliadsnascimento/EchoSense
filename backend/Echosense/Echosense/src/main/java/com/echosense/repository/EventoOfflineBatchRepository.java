package com.echosense.repository;

import com.echosense.dto.SincronizacaoItemDto;
import java.util.List;

public interface EventoOfflineBatchRepository {
    void upsertEventos(List<SincronizacaoItemDto> lote);
}


