package com.ipn.dashboard.controller;

import com.ipn.dashboard.model.Avs;
import com.ipn.dashboard.repository.AvsRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/avs")
@CrossOrigin(origins = "*") // Dein React-Port muss für Produktiv angepasst werden.

public class AvsController {

    private final AvsRepository avsRepository;

    // Spring injiziert das Repository automatisch
    public AvsController(AvsRepository avsRepository) {
        this.avsRepository = avsRepository;
    }

    @GetMapping
    public List<Avs> getAllAvsData() {
        // Holt alle Zeilen aus der bestehenden AVS-Tabelle
        return avsRepository.findAll();
    }
}
