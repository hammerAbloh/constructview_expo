package com.constructview.backend.service;

import com.constructview.backend.dto.AuthResponse;
import com.constructview.backend.dto.LoginRequest;
import com.constructview.backend.dto.RegisterRequest;
import com.constructview.backend.model.Role;
import com.constructview.backend.model.Usuario;
import com.constructview.backend.repository.UsuarioRepository;
import com.constructview.backend.repository.CodigoConviteRepository;
import com.constructview.backend.model.Obra;
import com.constructview.backend.repository.ObraRepository;
import com.constructview.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository repository;
    private final CodigoConviteRepository codigoConviteRepository;
    private final ObraRepository obraRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse registrar(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        Role roleToAssign = request.getRole() != null ? request.getRole() : Role.CLIENTE;

        if (roleToAssign == Role.ADMIN) {
            throw new RuntimeException("Não é possível registrar como ADMIN via endpoint público");
        }

        String nomeUsuario = request.getNome();

        if (roleToAssign == Role.CONSTRUTORA) {
            var convite = codigoConviteRepository.findByCodigoAndUsadoFalse(request.getCodigoConvite())
                    .orElseThrow(() -> new RuntimeException("Código inválido ou já usado"));
            
            // Permite que a construtora use o nome que digitou no cadastro
            nomeUsuario = request.getNome() != null && !request.getNome().isBlank() ? request.getNome() : convite.getNomeConstrutora();
            convite.setUsado(true);
            convite.setEmailUsado(request.getEmail());
            codigoConviteRepository.save(convite);
        }

        var user = Usuario.builder()
                .nome(nomeUsuario)
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getSenha()))
                .role(roleToAssign)
                .build();
        repository.save(user);

        if (roleToAssign == Role.CONSTRUTORA) {
            Obra novaObra = new Obra();
            novaObra.setNome(nomeUsuario);
            novaObra.setProgresso(0);
            novaObra.setConstrutora(nomeUsuario);
            novaObra.setStatus("Em Andamento");
            novaObra.setRisco("Baixo");
            novaObra.setRoi(0);
            novaObra.setEvolucao("[{\"mes\":\"Mês 1\",\"progresso\":0}]");
            novaObra.setCriadoPor(user);
            
            // Adicionando uma imagem padrão genérica para a obra
            novaObra.setFotos(List.of("https://images.unsplash.com/photo-1541888086225-f674ce89a84b?q=80&w=2070&auto=format&fit=crop"));
            
            obraRepository.save(novaObra);
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getRole(), user.getNome(), user.getEmail());
    }

    public AuthResponse login(LoginRequest request) {
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(request.getSenha(), user.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getRole(), user.getNome(), user.getEmail());
    }
}
