
package com.echosense.service;

import com.echosense.dto.EventoSonoroRequestDto;
import com.echosense.model.Ambiente;
import com.echosense.model.EventoSonoro;
import com.echosense.model.FeedbackEvento;
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

    public EventoSonoroService(
            EventoSonoroRepository eventoSonoroRepository,
            TipoSomRepository tipoSomRepository,
            AmbienteRepository ambienteRepository) {

        this.eventoSonoroRepository = eventoSonoroRepository;
        this.tipoSomRepository = tipoSomRepository;
        this.ambienteRepository = ambienteRepository;
    }

    @Transactional
    public EventoSonoro registrarEvento(EventoSonoroRequestDto dto) {

        EventoSonoro evento = new EventoSonoro();

        evento.setConfianca(dto.nivelConfianca());

        if (dto.dataHora() != null) {
            evento.setDataHora(dto.dataHora());
        }

        Ambiente ambiente = ambienteRepository
                .findById(dto.idAmbiente())
                .orElseThrow(() -> new RuntimeException(
                        "Erro: Ambiente não encontrado com ID "
                                + dto.idAmbiente()
                ));

        evento.setAmbiente(ambiente);

        evento.setUsuario(ambiente.getUsuario());

        String nomeSom = dto.tipoSom();

        TipoSom tipo = tipoSomRepository.findByNomeSom(nomeSom)
                .orElseGet(() -> {
                    TipoSom novo = new TipoSom();
                    novo.setNomeSom(nomeSom);
                    novo.setCategoria("Geral");

                    return tipoSomRepository.save(novo);
                });

        evento.setTipoSom(tipo);

        return eventoSonoroRepository.save(evento);
    }

    @Transactional(readOnly = true)
    public EventoSonoro buscarPorId(Long id) {

        return eventoSonoroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Evento sonoro não encontrado com ID: " + id
                ));
    }

    @Transactional(readOnly = true)
    public List<EventoSonoro> listarHistorico() {

        return eventoSonoroRepository.findAll();
    }

    @Transactional
    public void excluir(Long id) {

        EventoSonoro evento = buscarPorId(id);

        eventoSonoroRepository.delete(evento);
    }

    @Transactional
    public void atualizarFeedback(Long id, String feedbackStr) {

        EventoSonoro evento = buscarPorId(id);

        FeedbackEvento feedback = FeedbackEvento.valueOf(
                feedbackStr.toUpperCase()
        );

        evento.setFeedback(feedback);

        eventoSonoroRepository.save(evento);
    }
}
