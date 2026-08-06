package com.ipn.dashboard.service;

import com.ipn.dashboard.model.ChatMessage;
import com.ipn.dashboard.model.Sender;
import com.ipn.dashboard.model.User;
import com.ipn.dashboard.repository.ChatMessageRepository;
import com.ipn.dashboard.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository, UserRepository userRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
    }

    public void save(Integer userId, Sender sender, String text) {
        User user = userRepository.getReferenceById(userId);
        ChatMessage message = new ChatMessage();
        message.setUser(user);
        message.setSender(sender);
        message.setText(text);
        chatMessageRepository.save(message);
    }

    public List<ChatMessage> history(Integer userId) {
        return chatMessageRepository.findByUser_IdOrderByCreatedAtAsc(userId);
    }
}
