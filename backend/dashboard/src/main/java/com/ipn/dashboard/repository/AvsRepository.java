package com.ipn.dashboard.repository;

import com.ipn.dashboard.model.Avs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvsRepository extends JpaRepository<Avs, Long> {
    // Hier stellt Spring Boot automatisch alle Grundbefehle wie findAll() bereit
}