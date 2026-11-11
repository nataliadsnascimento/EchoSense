
package com.echosense.service;

import com.echosense.dto.TipoSomRequestDto;
import com.echosense.model.TipoSom;
import com.echosense.repository.TipoSomRepository;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TipoSomService {

    private final TipoSomRepository tipoSomRepository;

    public TipoSomService(TipoSomRepository tipoSomRepository) {
        this.tipoSomRepository = tipoSomRepository;
    }

    @Transactional
    public TipoSom criar(TipoSomRequestDto dto) {

        if (tipoSomRepository.findByNomeSom(dto.nomeSom()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Já existe um tipo de som com esse nome"
            );
        }

        TipoSom tipoSom = new TipoSom();

        tipoSom.setNomeSom(dto.nomeSom());
        tipoSom.setCategoria(dto.categoria());
        tipoSom.setDescricao(dto.descricao());
        tipoSom.setIcone(dto.icone());

        return tipoSomRepository.save(tipoSom);
    }

    @Transactional(readOnly = true)
    public List<TipoSom> listarTodos() {
        return tipoSomRepository.findAll();
    }

    @Transactional(readOnly = true)
    public TipoSom buscarPorId(Long id) {

        return tipoSomRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Tipo de som não encontrado"
                ));
    }

    @Transactional
    public TipoSom atualizar(Long id, TipoSomRequestDto dto) {

        TipoSom tipoSom = buscarPorId(id);

        tipoSomRepository.findByNomeSom(dto.nomeSom())
                .ifPresent(existente -> {
                    if (!existente.getId().equals(id)) {
                        throw new ResponseStatusException(
                                HttpStatus.CONFLICT,
                                "Já existe outro tipo de som com esse nome"
                        );
                    }
                });

        tipoSom.setNomeSom(dto.nomeSom());
        tipoSom.setCategoria(dto.categoria());
        tipoSom.setDescricao(dto.descricao());
        tipoSom.setIcone(dto.icone());

        return tipoSomRepository.save(tipoSom);
    }

    @Transactional
    public void excluir(Long id) {

        TipoSom tipoSom = buscarPorId(id);

        try {
            tipoSomRepository.delete(tipoSom);
            tipoSomRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Não é possível excluir um tipo de som utilizado por eventos", e);
        }
    }
}
