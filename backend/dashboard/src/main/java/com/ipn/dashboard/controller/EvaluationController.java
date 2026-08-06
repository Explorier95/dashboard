package com.ipn.dashboard.controller;

import com.ipn.dashboard.dto.EvaluationRequest;
import com.ipn.dashboard.dto.EvaluationResponse;
import com.ipn.dashboard.model.Evaluation;
import com.ipn.dashboard.model.Role;
import com.ipn.dashboard.model.User;
import com.ipn.dashboard.repository.EvaluationRepository;
import com.ipn.dashboard.repository.UserRepository;
import com.ipn.dashboard.security.AuthenticatedUser;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
public class EvaluationController {

    private final EvaluationRepository evaluationRepository;
    private final UserRepository userRepository;

    public EvaluationController(EvaluationRepository evaluationRepository, UserRepository userRepository) {
        this.evaluationRepository = evaluationRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<EvaluationResponse> create(Authentication authentication, @Valid @RequestBody EvaluationRequest request) {
        AuthenticatedUser teacherPrincipal = (AuthenticatedUser) authentication.getPrincipal();

        User student = userRepository.findById(request.studentId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Schueler nicht gefunden."));
        if (student.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bewertungen koennen nur fuer Schueler angelegt werden.");
        }
        User teacher = userRepository.getReferenceById(teacherPrincipal.id());

        Evaluation evaluation = new Evaluation();
        evaluation.setStudent(student);
        evaluation.setTeacher(teacher);
        evaluation.setScore(request.score());
        evaluation.setFeedback(request.feedback());
        evaluation.setUsedHint(request.usedHint());

        Evaluation saved = evaluationRepository.save(evaluation);
        return ResponseEntity.status(HttpStatus.CREATED).body(EvaluationResponse.from(saved));
    }

    @GetMapping
    public List<EvaluationResponse> list(@RequestParam(required = false) Integer studentId) {
        List<Evaluation> evaluations = studentId != null
                ? evaluationRepository.findByStudent_IdOrderByCreatedAtDesc(studentId)
                : evaluationRepository.findAllByOrderByCreatedAtDesc();
        return evaluations.stream().map(EvaluationResponse::from).toList();
    }

    @GetMapping("/me")
    public List<EvaluationResponse> me(Authentication authentication) {
        AuthenticatedUser principal = (AuthenticatedUser) authentication.getPrincipal();
        return evaluationRepository.findByStudent_IdOrderByCreatedAtDesc(principal.id()).stream()
                .map(EvaluationResponse::from)
                .toList();
    }
}
