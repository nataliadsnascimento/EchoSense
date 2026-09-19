package com.echosense.service;

import com.echosense.dto.EventoSonoroRequestdto;
import com.echosense.model.EventoSonoro;
import com.echosense.model.TipoSom;
import com.echosense.model.Usuario;
import com.echosense.repository.EventoSonoroRepository;
import com.echosense.repository.TipoSomRepository;
import com.echosense.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventoSonoroService {

    private final EventoSonoroRepository eventoSonoroRepository;
    private final TipoSomRepository tipoSomRepository;
    private final UsuarioRepository usuarioRepository;

    public EventoSonoroService(EventoSonoroRepository eventoSonoroRepository,
                               TipoSomRepository tipoSomRepository,
                               UsuarioRepository usuarioRepository) {
        this.eventoSonoroRepository = eventoSonoroRepository;
        this.tipoSomRepository = tipoSomRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public EventoSonoro registrarEvento(EventoSonoroRequestdto dto) {
        EventoSonoro evento = new EventoSonoro();

        evento.setConfianca(dto.getNivelConfianca());

        if (dto.getDataHora() != null) {
            evento.setDataHora(dto.getDataHora());
        } else {
            evento.setDataHora(LocalDateTime.now());
        }

        Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Erro: Usuário não encontrado com ID " + dto.getIdUsuario()));
        evento.setUsuario(usuario);

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