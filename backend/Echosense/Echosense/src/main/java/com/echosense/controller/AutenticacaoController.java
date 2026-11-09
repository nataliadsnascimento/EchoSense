package com.echosense.controller;


import com.echosense.dto.DadosAutenticacao;
import com.echosense.dto.DadosCadastroUsuario;
import com.echosense.dto.DadosTokenJWT;
import com.echosense.model.Usuario;
import com.echosense.repository.UsuarioRepository;
import com.echosense.service.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<DadosTokenJWT> efetuarLogin(@RequestBody @Valid DadosAutenticacao dados){
        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
        var authentication = manager.authenticate(authenticationToken);

        var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());

        return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
    }

    @PostMapping("/register")
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastroUsuario dados){
        if (usuarioRepository.existsByEmail(dados.email())){
            return ResponseEntity.badRequest().body("E-mail já cadastrado no sistema");
        }

        var senhaCriptografada = passwordEncoder.encode(dados.senha());
        var novoUsuario = new Usuario(dados.nome(), dados.sobrenome(), dados.email(), senhaCriptografada);

        usuarioRepository.save(novoUsuario);

        return ResponseEntity.ok().build();
    }
}
