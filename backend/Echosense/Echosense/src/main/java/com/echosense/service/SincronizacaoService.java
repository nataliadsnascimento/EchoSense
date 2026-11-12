package com.echosense.service;

import com.echosense.dto.SincronizacaoItemDto;
import com.echosense.repository.EventoOfflineRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class SincronizacaoService {

    private final EventoOfflineRepository repository;

    @Transactional
    public void processarSincronizacao(List<SincronizacaoItemDto> lote){
        repository.upsertEventos(lote);
    }
}
