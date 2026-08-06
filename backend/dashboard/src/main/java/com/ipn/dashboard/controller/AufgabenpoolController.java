package com.ipn.dashboard.controller;

import com.ipn.dashboard.model.Aufgabenpool;
import com.ipn.dashboard.repository.AufgabenpoolRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/aufgabenpool")
public class AufgabenpoolController {

    private final AufgabenpoolRepository aufgabenpoolRepository;

    public AufgabenpoolController(AufgabenpoolRepository aufgabenpoolRepository) {
        this.aufgabenpoolRepository = aufgabenpoolRepository;
    }

    @GetMapping
    public List<Aufgabenpool> getAllAufgaben() {
        return aufgabenpoolRepository.findAllByOrderByErstelltAmDesc();
    }
}
