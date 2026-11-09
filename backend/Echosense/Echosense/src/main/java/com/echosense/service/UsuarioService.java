package com.echosense.service;

import com.echosense.model.Usuario;
import com.echosense.model.Ambiente;
import com.echosense.repository.UsuarioRepository;
import com.echosense.repository.AmbienteRepository;
import com.echosense.repository.ConfiguracaoUsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final AmbienteRepository ambienteRepository;
    private final ConfiguracaoUsuarioRepository configuracaoRepository;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            AmbienteRepository ambienteRepository,
            ConfiguracaoUsuarioRepository configuracaoRepository) {

        this.usuarioRepository = usuarioRepository;
        this.ambienteRepository = ambienteRepository;
        this.configuracaoRepository = configuracaoRepository;
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não encontrado com ID: " + id
                ));
    }

    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = buscarPorId(id);

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setSobrenome(usuarioAtualizado.getSobrenome());

        return usuarioRepository.save(usuario);
    }

    @Transactional
    public void deletarUsuario(Long id) {
        Usuario usuario = buscarPorId(id);

        List<Ambiente> ambientes =
                ambienteRepository.findByUsuarioId(id);

        ambienteRepository.deleteAll(ambientes);
        ambienteRepository.flush();

        configuracaoRepository.findByUsuarioId(id)
                .ifPresent(configuracao -> {
                    usuario.setConfiguracao(null);
                    configuracaoRepository.delete(configuracao);
                    configuracaoRepository.flush();
                });

        usuarioRepository.delete(usuario);
        usuarioRepository.flush();
    }
}