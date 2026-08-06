package com.ipn.dashboard.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

// Mappt auf die neue, grossgeschriebene Aufgabenpool-Tabelle. Die alte kleingeschriebene
// aufgabenpool-Tabelle wurde zu einer Vector-Embedding-Tabelle umgebaut und hat die
// urspruenglichen Spalten (thema/frage/etc.) nicht mehr. Java-Feldnamen bleiben bewusst
// wie zuvor (z.B. "frage" statt "aufgabe"), damit die bestehende Frontend-Ansicht
// (Dashboard.jsx) unveraendert funktioniert - nur das @Column-Mapping wechselt.
@Entity
@Table(name = "aufgabenpool")
public class Aufgabenpool {

    @Id
    @Column(name = "`idAufgabenpool`")
    private Long id;

    @Column(name = "thema")
    private String thema;

    @Column(name = "schwierigkeit")
    private String schwierigkeit;

    @Column(name = "aufgabe")
    private String frage;

    @Column(name = "loesung")
    private String loesung;

    @Column(name = "quelle")
    private String quelle;

    @Column(name = "erstellt_am")
    private OffsetDateTime erstelltAm;

    @Column(name = "`evalOnlyKnowledgebase`")
    private Boolean evalOnlyKnowledgebase;

    @Column(name = "`evalWithKnowledgebase`")
    private Boolean evalWithKnowledgebase;

    public Aufgabenpool() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getThema() { return thema; }
    public void setThema(String thema) { this.thema = thema; }

    public String getSchwierigkeit() { return schwierigkeit; }
    public void setSchwierigkeit(String schwierigkeit) { this.schwierigkeit = schwierigkeit; }

    public String getFrage() { return frage; }
    public void setFrage(String frage) { this.frage = frage; }

    public String getLoesung() { return loesung; }
    public void setLoesung(String loesung) { this.loesung = loesung; }

    public String getQuelle() { return quelle; }
    public void setQuelle(String quelle) { this.quelle = quelle; }

    public OffsetDateTime getErstelltAm() { return erstelltAm; }
    public void setErstelltAm(OffsetDateTime erstelltAm) { this.erstelltAm = erstelltAm; }

    public Boolean getEvalOnlyKnowledgebase() { return evalOnlyKnowledgebase; }
    public void setEvalOnlyKnowledgebase(Boolean evalOnlyKnowledgebase) { this.evalOnlyKnowledgebase = evalOnlyKnowledgebase; }

    public Boolean getEvalWithKnowledgebase() { return evalWithKnowledgebase; }
    public void setEvalWithKnowledgebase(Boolean evalWithKnowledgebase) { this.evalWithKnowledgebase = evalWithKnowledgebase; }
}
