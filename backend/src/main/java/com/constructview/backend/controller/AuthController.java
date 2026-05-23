// src/main/java/com/constructview/backend/controller/AuthController.java
package com.constructview.backend.controller;

import com.constructview.backend.dto.AuthResponse;
import com.constructview.backend.dto.LoginRequest;
import com.constructview.backend.dto.RegisterRequest;
import com.constructview.backend.repository.CodigoConviteRepository;
import com.constructview.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final CodigoConviteRepository codigoConviteRepository; // FALTAVA ISSO

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registrar(request));
    }

    @PostMapping("/validar-codigo")
    public ResponseEntity<?> validarCodigo(@RequestBody Map<String, String> body) {
        String codigo = body.get("codigo");
        if (codigo == null || codigo.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Código obrigatório"));
        }

        return codigoConviteRepository.findByCodigoAndUsadoFalse(codigo)
                .map(convite -> ResponseEntity.ok(Map.of("nomeConstrutora", convite.getNomeConstrutora())))
                .orElse(ResponseEntity.badRequest().body(Map.of("erro", "Código inválido ou já usado")));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        // Mock endpoint - sempre retorna 200 para demonstração na banca
        return ResponseEntity.ok(Map.of("message", "Link enviado com sucesso se o email existir."));
    }
}