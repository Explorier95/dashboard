package com.ipn.dashboard.controller;

import com.ipn.dashboard.dto.ChatMessageResponse;
import com.ipn.dashboard.model.Role;
import com.ipn.dashboard.model.Sender;
import com.ipn.dashboard.security.AuthenticatedUser;
import com.ipn.dashboard.service.ChatMessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class TutorChatController {

    private static final Logger log = LoggerFactory.getLogger(TutorChatController.class);

    private final RestClient restClient = RestClient.create();
    private final ChatMessageService chatMessageService;

    @Value("${tutor.webhook-url}")
    private String webhookUrl;

    @Value("${knowledgebase.auth-header}")
    private String authHeader;

    @Value("${knowledgebase.auth-token}")
    private String authToken;

    public TutorChatController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    public record ChatRequest(String message, String sessionId) {}

    public record ChatResponse(String reply) {}

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(Authentication authentication, @RequestBody ChatRequest request) {
        if (request.message() == null || request.message().isBlank()) {
            return ResponseEntity.badRequest().body("Nachricht darf nicht leer sein.");
        }

        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();
        String sessionId = String.valueOf(user.id());

        try {
            chatMessageService.save(user.id(), Sender.STUDENT, request.message());
        } catch (Exception e) {
            // Persistenz-Fehler duerfen die Tutor-Antwort nicht blockieren.
            log.warn("Konnte Chat-Nachricht nicht speichern (userId={})", user.id(), e);
        }

        try {
            Map<String, Object> body = Map.of(
                    "chatInput", request.message(),
                    "sessionId", sessionId
            );

            ChatResponse response = restClient.post()
                    .uri(webhookUrl)
                    .header(authHeader, authToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(ChatResponse.class);

            if (response != null && response.reply() != null) {
                try {
                    chatMessageService.save(user.id(), Sender.AGENT, response.reply());
                } catch (Exception e) {
                    log.warn("Konnte Tutor-Antwort nicht speichern (userId={})", user.id(), e);
                }
            }

            return ResponseEntity.ok(response);
        } catch (RestClientResponseException e) {
            // n8n hat inhaltlich geantwortet (z.B. Workflow-Fehler) - 1:1 durchreichen.
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (RestClientException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body("Weiterleitung an Tutor-Workflow fehlgeschlagen: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    public List<ChatMessageResponse> history(
            Authentication authentication,
            @RequestParam(required = false) Integer studentId
    ) {
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();

        Integer targetUserId = user.id();
        if (studentId != null) {
            if (user.role() != Role.TEACHER) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Nur Lehrer duerfen fremde Chatverlaeufe einsehen.");
            }
            targetUserId = studentId;
        }

        return chatMessageService.history(targetUserId).stream()
                .map(ChatMessageResponse::from)
                .toList();
    }
}
