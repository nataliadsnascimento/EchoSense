package com.echosense.repository;
import com.echosense.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    Usuario findByEmail(String email);

    boolean existsByEmail(String email);
}
