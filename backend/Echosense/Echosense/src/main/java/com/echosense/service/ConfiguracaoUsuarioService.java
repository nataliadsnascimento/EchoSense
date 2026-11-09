package com.echosense.service;

import com.echosense.dto.ConfiguracaoUsuarioRequestDto;
import com.echosense.model.ConfiguracaoUsuario;
import com.echosense.model.Usuario;
import com.echosense.repository.ConfiguracaoUsuarioRepository;
import com.echosense.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ConfiguracaoUsuarioService {

    private final ConfiguracaoUsuarioRepository configuracaoRepository;
    private final UsuarioRepository usuarioRepository;

    public ConfiguracaoUsuarioService(ConfiguracaoUsuarioRepository configuracaoRepository, UsuarioRepository usuarioRepository) {
        this.configuracaoRepository = configuracaoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public ConfiguracaoUsuario criarConfiguracao(ConfiguracaoUsuarioRequestDto dto) {
        Usuario usuario = usuarioRepository.findById(dto.idUsuario())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        ConfiguracaoUsuario config = new ConfiguracaoUsuario();
        config.setUsuario(usuario);
        config.setVibracao(dto.vibracao() != null ? dto.vibracao() : true);
        config.setVolume(dto.volume() != null ? dto.volume() : 100);
        config.setTema(dto.tema() != null ? dto.tema() : "Claro");
        config.setSonsAtivos(dto.sonsAtivos());

        return configuracaoRepository.save(config);
    }

    public ConfiguracaoUsuario buscarPorUsuario(Long idUsuario) {
        return configuracaoRepository.findByUsuarioId(idUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Configuração não encontrada para este usuário."));
    }

    @Transactional
    public ConfiguracaoUsuario atualizarConfiguracao(Long idUsuario, ConfiguracaoUsuarioRequestDto dto) {
        ConfiguracaoUsuario configExistente = buscarPorUsuario(idUsuario);

        if (dto.vibracao() != null) configExistente.setVibracao(dto.vibracao());
        if (dto.volume() != null) configExistente.setVolume(dto.volume());
        if (dto.tema() != null) configExistente.setTema(dto.tema());
        if (dto.sonsAtivos() != null) configExistente.setSonsAtivos(dto.sonsAtivos());

        return configuracaoRepository.save(configExistente);
    }
}