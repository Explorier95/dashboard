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
        BigDecimal score,
        String feedback,
        OffsetDateTime createdAt
) {
    public static EvaluationResponse from(Evaluation evaluation) {
        return new EvaluationResponse(
                evaluation.getId(),
                evaluation.getStudent().getId(),
                evaluation.getStudent().getUsername(),
                evaluation.getTeacher() != null ? evaluation.getTeacher().getId() : null,
                evaluation.getTeacher() != null ? evaluation.getTeacher().getUsername() : null,
                evaluation.getScore(),
                evaluation.getFeedback(),
                evaluation.getCreatedAt()
        );
    }
}
