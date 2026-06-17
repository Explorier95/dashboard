
package com.ipn.dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ipn.dashboard.model.Evaluation;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    // Spring Boot generiert die SQL-Befehle automatisch!
}
