package com.hrms.service;

import com.hrms.entity.ChatMessage;
import com.hrms.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public List<ChatMessage> getAllMessages() {
        return chatMessageRepository.findAll();
    }

    public ChatMessage saveMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }
    
    public void deleteMessageById(Long id) {
        if (chatMessageRepository.existsById(id)) {
            chatMessageRepository.deleteById(id);
        } else {
            throw new RuntimeException("Message not found");
        }
    }


    public void likeMessage(Long id) {
        chatMessageRepository.findById(id).ifPresent(msg -> {
            msg.setLikes(msg.getLikes() + 1);
            chatMessageRepository.save(msg);
        });
    }
}