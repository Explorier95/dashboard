package com.ipn.dashboard.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/knowledgebase")
public class KnowledgebaseController {

    private final RestClient restClient = RestClient.create();

    @Value("${knowledgebase.webhook-url}")
    private String webhookUrl;

    @Value("${knowledgebase.auth-header}")
    private String authHeader;

    @Value("${knowledgebase.auth-token}")
    private String authToken;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam("thema") String thema) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Keine Datei übermittelt.");
        }
        if (!MediaType.APPLICATION_PDF_VALUE.equals(file.getContentType())) {
            return ResponseEntity.badRequest().body("Nur PDF-Dateien sind erlaubt.");
        }
        if (thema == null || thema.isBlank()) {
            return ResponseEntity.badRequest().body("Thema darf nicht leer sein.");
        }

        try {
            ByteArrayResource fileResource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };

            // n8n-Webhooks erwarten Binärdaten standardmäßig unter dem Property-Namen "data".
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("data", fileResource);
            body.add("thema", thema);

            ResponseEntity<String> response = restClient.post()
                    .uri(webhookUrl)
                    .header(authHeader, authToken)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(body)
                    .retrieve()
                    .toEntity(String.class);

            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Datei konnte nicht gelesen werden: " + e.getMessage());
        } catch (RestClientResponseException e) {
            // n8n hat inhaltlich geantwortet (z.B. 409 bei Duplikat-Erkennung im Workflow) -
            // Status und Body 1:1 durchreichen, damit das Frontend darauf reagieren kann.
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (RestClientException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body("Weiterleitung an n8n-Workflow fehlgeschlagen: " + e.getMessage());
        }
    }
}
