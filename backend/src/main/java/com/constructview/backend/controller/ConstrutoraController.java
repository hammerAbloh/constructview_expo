package com.constructview.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/construtoras")
public class ConstrutoraController {

    // Endpoint mais lógico e fácil de realizar o cadastro de novas construtoras
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> criarConstrutora(@RequestBody Map<String, String> dados) {
        String nome = dados.get("nome");
        String cnpj = dados.get("cnpj");
        
        if (nome == null || nome.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Nome da construtora é obrigatório"));
        }
        
        // Simula a criação de construtora de forma simples para a banca (Mock)
        // Aqui poderia inserir no banco de dados ConstrutoraRepository
        return ResponseEntity.ok(Map.of(
            "message", "Construtora " + nome + " cadastrada com sucesso",
            "id", System.currentTimeMillis()
        ));
    }
}
