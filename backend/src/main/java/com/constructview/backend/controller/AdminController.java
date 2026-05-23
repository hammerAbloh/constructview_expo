// src/main/java/com/constructview/backend/controller/AdminController.java
package com.constructview.backend.controller;

import com.constructview.backend.model.CodigoConvite;
import com.constructview.backend.repository.CodigoConviteRepository;
import com.constructview.backend.repository.UsuarioRepository;
import com.constructview.backend.model.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final CodigoConviteRepository codigoRepo;
    private final UsuarioRepository usuarioRepo;

    @PostMapping("/gerar-codigo")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> gerarCodigo(@RequestBody Map<String, String> body) {
        String nome = body.get("nomeConstrutora");
        if (nome == null || nome.isBlank()) {
            nome = "CONSTRUTORA"; // fallback genérico
        }

        CodigoConvite c = new CodigoConvite();
        c.setNomeConstrutora(nome);
        String prefix = nome.replaceAll("[^a-zA-Z]", "").toUpperCase();
        if (prefix.isBlank()) prefix = "CV";
        c.setCodigo("CV-" + (prefix.length() > 3 ? prefix.substring(0, 3) : prefix) + "-"
                + UUID.randomUUID().toString().substring(0, 4).toUpperCase());
        return ResponseEntity.ok(codigoRepo.save(c));
    }

    @GetMapping("/codigos")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<CodigoConvite> listar() {
        return codigoRepo.findAll();
    }

    @GetMapping("/usuarios")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Usuario> listarUsuarios() {
        return usuarioRepo.findAll();
    }
}