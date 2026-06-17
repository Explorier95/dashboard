package com.ipn.dashboard.model;

import jakarta.persistence.*;

@Entity
public class Evaluation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String studentId;
    private String feedback;
    private int score;

    // Getter und Setter (oder nutze Lombok @Data)
    public String getStudentId() { return studentId; }
    public String getFeedback() { return feedback; }
    public int getScore() { return score; }
}