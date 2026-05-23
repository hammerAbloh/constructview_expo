package com.constructview.backend.repository;

import com.constructview.backend.model.Obra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ObraRepository extends JpaRepository<Obra, Long> {
    List<Obra> findByStatus(String status);
}
