package com.echosense.repository;
import com.echosense.model.TipoSom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipoSomRepository extends  JpaRepository<TipoSom, Long>{
    Optional<TipoSom> findByNomeSom(String nome);
}
