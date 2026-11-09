package com.echosense.service;

import com.echosense.dto.AmbienteRequestDto;
import com.echosense.model.Ambiente;
import com.echosense.model.ConfiguracaoUsuario;
import com.echosense.model.Usuario;
import com.echosense.repository.AmbienteRepository;
import com.echosense.repository.ConfiguracaoUsuarioRepository;
import com.echosense.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AmbienteService {

    private final AmbienteRepository ambienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final ConfiguracaoUsuarioRepository configuracaoRepository;

    public AmbienteService(
            AmbienteRepository ambienteRepository,
            UsuarioRepository usuarioRepository,
            ConfiguracaoUsuarioRepository configuracaoRepository) {

        this.ambienteRepository = ambienteRepository;
        this.usuarioRepository = usuarioRepository;
        this.configuracaoRepository = configuracaoRepository;
    }

    public List<Ambiente> listarPorUsuario(Long usuarioId) {
        return ambienteRepository.findByUsuarioId(usuarioId);
    }

    public Ambiente buscarPorId(Long id) {
        return ambienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ambiente não encontrado com ID: " + id
                ));
    }

    @Transactional
    public Ambiente criarAmbiente(AmbienteRequestDto dto) {

        Usuario usuario = usuarioRepository.findById(dto.idUsuario())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não encontrado"
                ));

        ConfiguracaoUsuario configuracao =
                configuracaoRepository.findById(dto.idConfiguracao())
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Configuração não encontrada"
                        ));

        if (!configuracao.getUsuario().getId().equals(usuario.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "A configuração não pertence ao usuário informado"
            );
        }

        Ambiente ambiente = new Ambiente();
        ambiente.setNomeAmbiente(dto.nomeAmbiente());
        ambiente.setTipoAmbiente(dto.tipoAmbiente());
        ambiente.setUsuario(usuario);
        ambiente.setConfiguracao(configuracao);

        return ambienteRepository.save(ambiente);
    }

    @Transactional
    public Ambiente atualizarAmbiente(Long id, AmbienteRequestDto dto) {

        Ambiente ambiente = buscarPorId(id);

        if (!ambiente.getUsuario().getId().equals(dto.idUsuario())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Não é permitido alterar o usuário do ambiente"
            );
        }

        ConfiguracaoUsuario configuracao =
                configuracaoRepository.findById(dto.idConfiguracao())
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Configuração não encontrada"
                        ));

        if (!configuracao.getUsuario().getId().equals(dto.idUsuario())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "A configuração não pertence ao usuário informado"
            );
        }

        ambiente.setNomeAmbiente(dto.nomeAmbiente());
        ambiente.setTipoAmbiente(dto.tipoAmbiente());
        ambiente.setConfiguracao(configuracao);

        return ambienteRepository.save(ambiente);
    }

    @Transactional
    public void deletarAmbiente(Long id) {
        Ambiente ambiente = buscarPorId(id);
        ambienteRepository.delete(ambiente);
    }
}