package com.echosense.service;

import com.echosense.dto.EventoSonoroRequestdto;
import com.echosense.model.Ambiente;
import com.echosense.model.EventoSonoro;
import com.echosense.model.TipoSom;
import com.echosense.repository.AmbienteRepository;
import com.echosense.repository.EventoSonoroRepository;
import com.echosense.repository.TipoSomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventoSonoroService {

    private final EventoSonoroRepository eventoSonoroRepository;
    private final TipoSomRepository tipoSomRepository;
    private final AmbienteRepository ambienteRepository;

    public EventoSonoroService(EventoSonoroRepository eventoSonoroRepository,
                               TipoSomRepository tipoSomRepository,
                               AmbienteRepository ambienteRepository) {
        this.eventoSonoroRepository = eventoSonoroRepository;
        this.tipoSomRepository = tipoSomRepository;
        this.ambienteRepository = ambienteRepository;
    }

    public EventoSonoro registrarEvento(EventoSonoroRequestdto dto) {
        EventoSonoro evento = new EventoSonoro();

        evento.setConfianca(dto.getNivelConfianca());

        if (dto.getDataHora() != null) {
            evento.setDataHora(dto.getDataHora());
        }

        Ambiente ambiente = ambienteRepository.findById(dto.getIdAmbiente())
                .orElseThrow(() -> new RuntimeException("Erro: Ambiente não encontrado com ID " + dto.getIdAmbiente()));
        evento.setAmbiente(ambiente);

        String nomeSom = dto.getTipoSom();
        TipoSom tipoEncontrado = tipoSomRepository.findByNomeSom(nomeSom)
                .orElseGet(() -> {
                    TipoSom novoTipo = new TipoSom();
                    novoTipo.setNomeSom(nomeSom);
                    novoTipo.setCategoria("Geral");
                    return tipoSomRepository.save(novoTipo);
                });

        evento.setTipoSom(tipoEncontrado);

        return eventoSonoroRepository.save(evento);
    }

    public EventoSonoro buscarPorId(Long id) {
        return eventoSonoroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento sonoro não encontrado com ID: " + id));
    }

    @Transactional(readOnly = true)
    public List<EventoSonoro> listarHistorico() {
        return eventoSonoroRepository.findAll();
    }

    public void excluir(Long id) {
        EventoSonoro evento = buscarPorId(id);
        eventoSonoroRepository.delete(evento);
    }
}