package com.ipn.dashboard.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record EvaluationRequest(
        @NotNull Integer studentId,
        @NotNull @DecimalMin(value = "0", inclusive = true) BigDecimal score,
        String feedback,
        Boolean usedHint
) {}
