package com.ipn.dashboard.dto;

import com.ipn.dashboard.model.Evaluation;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record EvaluationResponse(
        Integer id,
        Integer studentId,
        String studentUsername,
        Integer teacherId,
        String teacherUsername,
        Integer aufgabeId,
        String antwort,
        BigDecimal score,
        String feedback,
        Boolean usedHint,
        OffsetDateTime createdAt
) {
    public static EvaluationResponse from(Evaluation evaluation) {
        return new EvaluationResponse(
                evaluation.getId(),
                evaluation.getStudent().getId(),
                evaluation.getStudent().getUsername(),
                evaluation.getTeacher() != null ? evaluation.getTeacher().getId() : null,
                evaluation.getTeacher() != null ? evaluation.getTeacher().getUsername() : null,
                evaluation.getAufgabeId(),
                evaluation.getAntwort(),
                evaluation.getScore(),
                evaluation.getFeedback(),
                evaluation.getUsedHint(),
                evaluation.getCreatedAt()
        );
    }
}
