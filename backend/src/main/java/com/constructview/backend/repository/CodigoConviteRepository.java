package com.constructview.backend.repository;

import com.constructview.backend.model.CodigoConvite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CodigoConviteRepository extends JpaRepository<CodigoConvite, Long> {
    Optional<CodigoConvite> findByCodigoAndUsadoFalse(String codigo);
}
