package com.ipn.dashboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "AVS")
public class Avs {

    // 1. VPID wird als unsere ID genutzt
    @Id
    @Column(name = "VPID")
    private Long id; 

    // 2. Exakter Spaltenname: "Speaker"
    @Column(name = "Speaker")
    private String speakerName; 

    // 3. Exakter Spaltenname: "Text"
    @Column(name = "Text")
    private String text; 

    // 4. Exakter Spaltenname: "dialogstep_evaluation" (mit Unterstrich!)
    @Column(name = "dialogstep_evaluation")
    private String dialogstepEvaluation;
    
    @Column(name = "Question")
    private Long question; 

    // Die "status" Variable haben wir komplett gelöscht, da sie in der DB nicht existiert!

    // --- Standard Konstruktor ---
    public Avs() {}

    // --- Getter und Setter ---
    // (Diese Namen bleiben exakt so, damit im React-Frontend nichts kaputt geht)
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSpeakerName() { return speakerName; }
    public void setSpeakerName(String speakerName) { this.speakerName = speakerName; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getDialogstepEvaluation() { return dialogstepEvaluation; }
    public void setDialogstepEvaluation(String dialogstepEvaluation) { this.dialogstepEvaluation = dialogstepEvaluation; }

    public Long getQuestion() { return question; }
    public void setQuestion(Long question) { this.id = question; }
}