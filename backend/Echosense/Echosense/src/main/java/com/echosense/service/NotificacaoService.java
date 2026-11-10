
package com.echosense.service;

import com.echosense.dto.NotificacaoRequestDto;
import com.echosense.model.EventoSonoro;
import com.echosense.model.Notificacao;
import com.echosense.repository.EventoSonoroRepository;
import com.echosense.repository.NotificacaoRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class NotificacaoService {

    private final NotificacaoRepository notificacaoRepository;
    private final EventoSonoroRepository eventoSonoroRepository;

    public NotificacaoService(
            NotificacaoRepository notificacaoRepository,
            EventoSonoroRepository eventoSonoroRepository) {

        this.notificacaoRepository = notificacaoRepository;
        this.eventoSonoroRepository = eventoSonoroRepository;
    }

    @Transactional
    public Notificacao criar(NotificacaoRequestDto dto) {

        EventoSonoro evento = eventoSonoroRepository
                .findById(dto.idEvento())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Evento sonoro não encontrado"
                ));

        if (notificacaoRepository.existsByEventoSonoroId(dto.idEvento())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Este evento já possui uma notificação"
            );
        }

        Notificacao notificacao = new Notificacao();
        notificacao.setEventoSonoro(evento);
        notificacao.setTitulo(dto.titulo());
        notificacao.setMensagem(dto.mensagem());
        notificacao.setVisualizada(false);

        return notificacaoRepository.save(notificacao);
    }

    @Transactional(readOnly = true)
    public Notificacao buscarPorId(Long id) {
        return notificacaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Notificação não encontrada"
                ));
    }

    @Transactional
    public Notificacao marcarComoVisualizada(Long id) {

        Notificacao notificacao = buscarPorId(id);
        notificacao.setVisualizada(true);

        return notificacaoRepository.save(notificacao);
    }
}
