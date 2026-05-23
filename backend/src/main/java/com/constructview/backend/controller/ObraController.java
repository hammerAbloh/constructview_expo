package com.constructview.backend.controller;

import com.constructview.backend.model.Obra;
import com.constructview.backend.repository.ObraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/obras")
@RequiredArgsConstructor
public class ObraController {

    private final ObraRepository repository;

    @GetMapping
    public List<Obra> listarTodas(@RequestParam(required = false) String status) {
        if (status != null && !status.isBlank()) {
            return repository.findByStatus(status);
        }
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return repository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> criar(@RequestBody Obra obra) {
        try {
            return ResponseEntity.ok(repository.save(obra));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Obra obra) {
        try {
            return repository.findById(id).map(existente -> {
                // Atualizando com os campos novos que você criou no Obra.java:
                existente.setNome(obra.getNome());
                existente.setLat(obra.getLat());
                existente.setLng(obra.getLng());
                existente.setProgresso(obra.getProgresso());
                existente.setConstrutora(obra.getConstrutora());
                existente.setStatus(obra.getStatus());
                existente.setRisco(obra.getRisco());
                existente.setRoi(obra.getRoi());
                existente.setFotos(obra.getFotos());
                existente.setEvolucao(obra.getEvolucao());
                return ResponseEntity.ok(repository.save(existente));
            }).orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
