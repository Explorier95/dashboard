package com.ipn.dashboard.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

// Mappt auf die neue Chat_messages-Tabelle (ersetzt konzeptionell n8n_chat_histories als
// von uns gefuehrten Chatverlauf). sender ist per Migration (V2) ergaenzt, da das
// urspruengliche Schema keine Schueler/Agent-Unterscheidung vorsah. Session_idSession
// bleibt bewusst ungesetzt (nullable) - die volle Session/CBA/Aufgabenpool-Verzahnung
// ist ein groesseres, hier nicht angefragtes Feature.
@Entity
@Table(name = "chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`idChat_messages`")
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "`User_idUser`", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "sender", nullable = false)
    private Sender sender;

    @Column(name = "text", nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = OffsetDateTime.now();
    }

    public ChatMessage() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Sender getSender() { return sender; }
    public void setSender(Sender sender) { this.sender = sender; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
