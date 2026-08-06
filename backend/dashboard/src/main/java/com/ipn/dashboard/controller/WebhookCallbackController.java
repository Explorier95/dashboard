package com.ipn.dashboard.controller;

import com.ipn.dashboard.controller.N8nCallbackRequest;
import com.ipn.dashboard.model.ChatMessage;
import com.ipn.dashboard.model.User; // Anpassen an dein tatsächliches User-Model
import com.ipn.dashboard.repository.ChatMessageRepository;
import com.ipn.dashboard.repository.UserRepository; // Angenommen, du hast ein UserRepository
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;

@RestController
@RequestMapping("/api/chat")
public class WebhookCallbackController {

    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository; 

    public WebhookCallbackController(ChatMessageRepository chatMessageRepository, UserRepository userRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/webhook-callback")
    public ResponseEntity<Void> receiveN8nCallback(@RequestBody N8nCallbackRequest request) {
        
        // 1. Den zugehörigen User anhand der übergebenen ID finden
        User user = userRepository.findById(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("User nicht gefunden: " + request.getSessionId()));

        // 2. Neue Chat-Nachricht erstellen
        ChatMessage newMessage = new ChatMessage();
        newMessage.setUser(user);
        newMessage.setText(request.getReply()); // Passe "setText" an den Namen deines Feldes an
        newMessage.setCreatedAt(OffsetDateTime.now());

        // 3. In der Datenbank speichern
        chatMessageRepository.save(newMessage);

        // 4. Erfolgreich an n8n zurückmelden (HTTP 200 OK)
        return ResponseEntity.ok().build();
    }
}
