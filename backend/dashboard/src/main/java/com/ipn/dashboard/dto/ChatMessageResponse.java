package com.ipn.dashboard.dto;

import com.ipn.dashboard.model.ChatMessage;
import com.ipn.dashboard.model.Sender;

import java.time.OffsetDateTime;

public record ChatMessageResponse(
        Integer id,
        Sender sender,
        String text,
        OffsetDateTime createdAt
) {
    public static ChatMessageResponse from(ChatMessage message) {
        return new ChatMessageResponse(
                message.getId(),
                message.getSender(),
                message.getText(),
                message.getCreatedAt()
        );
    }
}
