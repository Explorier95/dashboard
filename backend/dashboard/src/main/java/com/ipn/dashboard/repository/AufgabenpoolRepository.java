package com.ipn.dashboard.repository;

import com.ipn.dashboard.model.Aufgabenpool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AufgabenpoolRepository extends JpaRepository<Aufgabenpool, Long> {
    List<Aufgabenpool> findAllByOrderByErstelltAmDesc();
}
