package com.echosense.service;

import com.echosense.dto.SincronizacaoItemDto;
import com.echosense.repository.EventoOfflineRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class SincronizacaoService {

    @Autowired
    private EventoOfflineRepository repository;

    @Transactional
    public void processarSincronizacao(List<SincronizacaoItemDto> lote){
        long inicio = System.currentTimeMillis();

        for (SincronizacaoItemDto item : lote) {
            repository.upsertEvento(
                    item.getId(),
                    item.getRegistro(),
                    item.getDataAlteracao()
            );
        }

        long tempoTotal = System.currentTimeMillis() - inicio;

        if(tempoTotal >500){
            System.out.println("Atenção! Processamento acima do limite de 500ms: " + tempoTotal + "ms");
        }

        System.out.println("Sincronização de" + lote.size() + " itens concluída em " + tempoTotal + "ms");
        }
    }
