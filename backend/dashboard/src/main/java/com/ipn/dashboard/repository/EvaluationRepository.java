
package com.ipn.dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ipn.dashboard.model.Evaluation;

import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Integer> {
    List<Evaluation> findByStudent_IdOrderByCreatedAtDesc(Integer studentId);
    List<Evaluation> findAllByOrderByCreatedAtDesc();
}
