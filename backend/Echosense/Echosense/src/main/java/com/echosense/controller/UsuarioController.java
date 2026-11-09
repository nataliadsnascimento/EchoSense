package com.echosense.controller;

import com.echosense.dto.DadosUsuarioResponse;
import com.echosense.model.Usuario;
import com.echosense.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosUsuarioResponse> buscarUsuario(
            @PathVariable Long id) {

        Usuario usuario = usuarioService.buscarPorId(id);

        return ResponseEntity.ok(converterParaDTO(usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DadosUsuarioResponse> atualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario usuarioAtualizado) {

        Usuario usuario =
                usuarioService.atualizarUsuario(id, usuarioAtualizado);

        return ResponseEntity.ok(converterParaDTO(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(
            @PathVariable Long id,
            Authentication authentication) {

        Usuario usuarioAutenticado =
                (Usuario) authentication.getPrincipal();

        if (!usuarioAutenticado.getId().equals(id)) {
            return ResponseEntity.status(
                    HttpStatus.FORBIDDEN
            ).build();
        }

        usuarioService.deletarUsuario(id);

        return ResponseEntity.noContent().build();
    }


    private DadosUsuarioResponse converterParaDTO(Usuario usuario) {
        return new DadosUsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getSobrenome(),
                usuario.getEmail(),
                usuario.getDataCadastro()
        );
    }
}