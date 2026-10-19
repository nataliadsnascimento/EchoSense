package com.echosense.service;

import com.echosense.model.Ambiente;
import com.echosense.repository.AmbienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmbienteService {

    private final AmbienteRepository ambienteRepository;

    public AmbienteService(AmbienteRepository ambienteRepository) {
        this.ambienteRepository = ambienteRepository;
    }

    public List<Ambiente> listarPorUsuario(Long usuarioId) {
        return ambienteRepository.findByUsuarioId(usuarioId);
    }

    public Ambiente buscarPorId(Long id) {
        return ambienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ambiente não encontrado com ID: " + id));
    }

    public Ambiente criarAmbiente(Ambiente ambiente) {
        return ambienteRepository.save(ambiente);
    }

    public Ambiente atualizarAmbiente(Long id, Ambiente ambienteAtualizado) {
        Ambiente ambiente = buscarPorId(id);

        ambiente.setNomeAmbiente(ambienteAtualizado.getNomeAmbiente());
        ambiente.setTipoAmbiente(ambienteAtualizado.getTipoAmbiente());

        if (ambienteAtualizado.getConfiguracao() != null) {
            ambiente.setConfiguracao(ambienteAtualizado.getConfiguracao());
        }

        return ambienteRepository.save(ambiente);
    }

    public void deletarAmbiente(Long id) {
        Ambiente ambiente = buscarPorId(id);
        ambienteRepository.delete(ambiente);
    }
}