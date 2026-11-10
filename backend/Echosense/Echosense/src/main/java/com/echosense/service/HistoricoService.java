package com.echosense.service;

import com.echosense.dto.HistoricoRequestDto;
import com.echosense.model.Ambiente;
import com.echosense.model.EventoSonoro;
import com.echosense.model.Historico;

import com.echosense.repository.AmbienteRepository;
import com.echosense.repository.EventoSonoroRepository;
import com.echosense.repository.HistoricoRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class HistoricoService {

    private final HistoricoRepository historicoRepository;
    private final AmbienteRepository ambienteRepository;
    private final EventoSonoroRepository eventoSonoroRepository;

    public HistoricoService(
            HistoricoRepository historicoRepository,
            AmbienteRepository ambienteRepository,
            EventoSonoroRepository eventoSonoroRepository) {

        this.historicoRepository = historicoRepository;
        this.ambienteRepository = ambienteRepository;
        this.eventoSonoroRepository = eventoSonoroRepository;
    }

    @Transactional
    public Historico gerarHistorico(HistoricoRequestDto dto) {

        if (dto.periodoFim().isBefore(dto.periodoInicio())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O fim do período não pode ser anterior ao início"
            );
        }

        Ambiente ambiente = ambienteRepository
                .findById(dto.idAmbiente())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ambiente não encontrado"
                ));

        List<EventoSonoro> eventos = eventoSonoroRepository
                .findByAmbienteIdAndDataHoraBetween(
                        dto.idAmbiente(),
                        dto.periodoInicio(),
                        dto.periodoFim()
                );

        int totalEventos = eventos.size();

        Map<String, Long> frequencias = eventos.stream()
                .map(evento -> evento.getTipoSom().getNomeSom())
                .collect(Collectors.groupingBy(
                        Function.identity(),
                        Collectors.counting()
                ));

        String tipoMaisFrequente = frequencias.entrySet()
                .stream()
                .sorted(
                        Map.Entry.<String, Long>comparingByValue()
                                .reversed()
                                .thenComparing(Map.Entry.comparingByKey())
                )
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(null);

        Historico historico = new Historico();

        historico.setAmbiente(ambiente);
        historico.setPeriodoInicio(dto.periodoInicio());
        historico.setPeriodoFim(dto.periodoFim());
        historico.setTotalEventos(totalEventos);
        historico.setTipoMaisFrequente(tipoMaisFrequente);

        return historicoRepository.save(historico);
    }

    @Transactional(readOnly = true)
    public Historico buscarPorId(Long id) {

        return historicoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Histórico não encontrado"
                ));
    }

    @Transactional(readOnly = true)
    public List<Historico> listarPorAmbiente(Long ambienteId) {

        if (!ambienteRepository.existsById(ambienteId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Ambiente não encontrado"
            );
        }

        return historicoRepository
                .findByAmbienteIdOrderByPeriodoInicioDesc(ambienteId);
    }

    @Transactional
    public void excluir(Long id) {

        Historico historico = buscarPorId(id);

        historicoRepository.delete(historico);
    }
}
