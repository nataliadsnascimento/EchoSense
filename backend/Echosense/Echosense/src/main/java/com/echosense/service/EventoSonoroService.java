package com.echosense.service;

import com.echosense.dto.EventoSonoroRequestdto;
import com.echosense.model.EventoSonoro;
import com.echosense.model.TipoSom;
import com.echosense.repository.EventoSonoroRepository;
import com.echosense.repository.TipoSomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EventoSonoroService {

    private final EventoSonoroRepository eventoSonoroRepository;
    private final TipoSomRepository tipoSomRepository;

    public EventoSonoroService(EventoSonoroRepository eventoSonoroRepository, TipoSomRepository tipoSomRepository) {
        this.eventoSonoroRepository = eventoSonoroRepository;
        this.tipoSomRepository = tipoSomRepository;
    }

    public EventoSonoro registrarEvento(EventoSonoroRequestdto dto) {
        EventoSonoro evento = new EventoSonoro();

        evento.setConfianca(dto.getNivelConfianca());

        if (dto.getDataHora() != null) {
            evento.setDataHora(dto.getDataHora());
        }

        String nomeDoSom = dto.getTipoSom();
        TipoSom tipoEncontrado = tipoSomRepository.findByNomeSom(nomeDoSom).orElseThrow(() -> new RuntimeException("Erro: Tipo de som não cadastrado -" + nomeDoSom));
        evento.setTipoSom(tipoEncontrado);

        return eventoSonoroRepository.save(evento);
    }
}