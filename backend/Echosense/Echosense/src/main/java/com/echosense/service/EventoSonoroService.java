package com.echosense.service;

import com.echosense.dto.EventoSonoroRequestdto;
import com.echosense.model.EventoSonoro;
import com.echosense.model.TipoSom;
import com.echosense.repository.EventoSonoroRepository;
import com.echosense.repository.TipoSomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
        } else {
            evento.setDataHora(LocalDateTime.now());
        }

        String nomeDoSom = dto.getTipoSom();
        TipoSom tipoEncontrado = tipoSomRepository.findByNomeSom(nomeDoSom).orElseThrow(() -> new RuntimeException("Erro: Tipo de som não cadastrado -" + nomeDoSom));
        evento.setTipoSom(tipoEncontrado);

        return eventoSonoroRepository.save(evento);
    }

    public EventoSonoro buscarPorId(Long id) {
        return eventoSonoroRepository.findById(id) .orElseThrow(() -> new RuntimeException("Evento sonoro não encontrado com ID: " + id));
    }

    public List<EventoSonoro> listarHistorico() {
        return eventoSonoroRepository.findAll();
    }

    public void excluir(Long id) {
        EventoSonoro evento = buscarPorId(id);
        eventoSonoroRepository.delete(evento);
    }
}