package com.ipn.dashboard.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

// Mappt auf die bestehende bewertungen-Tabelle des KI-Tutor-Workflows (aufgabe_id/antwort
// werden dort pro Aufgabe befuellt). Manuell durch Lehrer angelegte Bewertungen ueber diese
// App lassen aufgabeId/antwort bewusst leer und setzen stattdessen teacher.
@Entity
@Table(name = "bewertungen")
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "schueler_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;

    @Column(name = "aufgabe_id")
    private Integer aufgabeId;

    @Column(name = "antwort", columnDefinition = "TEXT")
    private String antwort;

    @Column(name = "punkte")
    private BigDecimal score;

    @Column(name = "feedback", columnDefinition = "TEXT")
    private String feedback;

    // NULL = unbekannt (nicht "nein") - aktuell schreibt weder unser Backend automatisch
    // noch der n8n-Workflow einen Wert hierhin, siehe V3-Migration.
    @Column(name = "used_hint")
    private Boolean usedHint;

    @Column(name = "erstellt_am", nullable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = OffsetDateTime.now();
    }

    public Evaluation() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public User getTeacher() { return teacher; }
    public void setTeacher(User teacher) { this.teacher = teacher; }

    public Integer getAufgabeId() { return aufgabeId; }
    public void setAufgabeId(Integer aufgabeId) { this.aufgabeId = aufgabeId; }

    public String getAntwort() { return antwort; }
    public void setAntwort(String antwort) { this.antwort = antwort; }

    public BigDecimal getScore() { return score; }
    public void setScore(BigDecimal score) { this.score = score; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public Boolean getUsedHint() { return usedHint; }
    public void setUsedHint(Boolean usedHint) { this.usedHint = usedHint; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
