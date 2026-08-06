package com.ipn.dashboard.repository;

import com.ipn.dashboard.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    List<ChatMessage> findByUser_IdOrderByCreatedAtAsc(Integer userId);
}
