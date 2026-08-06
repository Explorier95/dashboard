package com.ipn.dashboard.controller;

public class N8nCallbackRequest {
    private String reply;
    private Integer sessionId; // Entspricht der User-ID oder Session-ID aus n8n

    // Getter und Setter
    public String getReply() { return reply; }
    public void setReply(String reply) { this.reply = reply; }
    
    public Integer getSessionId() { return sessionId; }
    public void setSessionId(Integer sessionId) { this.sessionId = sessionId; }
}