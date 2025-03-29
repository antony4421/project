package com.hrms.controller;

import com.hrms.entity.ChatMessage;
import com.hrms.service.ChatMessageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import com.hrms.repository.ChatMessageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.nio.file.Files; 
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    public ChatMessageController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @GetMapping
    public List<ChatMessage> getAllMessages() {
        return chatMessageService.getAllMessages();
    }

    @PostMapping("/send")
    public ResponseEntity<ChatMessage> sendMessage(@RequestParam("employeeId") Long employeeId,
                                                   @RequestParam("sender") String sender,
                                                   @RequestParam("text") String text,
                                                   @RequestParam(value = "image", required = false) MultipartFile image) {
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            try {
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filePath = uploadDir.resolve(image.getOriginalFilename());
                Files.write(filePath, image.getBytes());
                imageUrl = "/uploads/" + image.getOriginalFilename();
            } catch (IOException e) {
                return ResponseEntity.badRequest().build();
            }
        }
        ChatMessage message = new ChatMessage(employeeId, sender, text, imageUrl);
        return ResponseEntity.ok(chatMessageService.saveMessage(message));
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<Void> likeMessage(@PathVariable Long id) {
        chatMessageService.likeMessage(id);
        return ResponseEntity.ok().build();
    }
    
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;     

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id, @RequestParam Long employeeId) {
        Optional<ChatMessage> message = chatMessageRepository.findById(id);
        if (message.isPresent()) {
            if (!message.get().getEmployeeId().equals(employeeId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only delete your own messages.");
            }
            chatMessageRepository.deleteById(id);
            return ResponseEntity.ok().body("Message deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Message not found.");
        }
    }

}