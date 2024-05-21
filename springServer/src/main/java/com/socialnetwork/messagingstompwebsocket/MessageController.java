package com.socialnetwork.messagingstompwebsocket;

import com.socialnetwork.messagingstompwebsocket.entities.MessageData;
import com.socialnetwork.messagingstompwebsocket.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class MessageController {
    @Autowired
    MessageService messageService;

    @MessageMapping("/chat/{sessionId}")
    @SendTo("/topic/{sessionId}")
    public MessageData send(@DestinationVariable String sessionId, MessageData message){
        return messageService.receiveMessage(message, sessionId);
    }

    @GetMapping(value = "/messages/{sessionId}", produces = "application/json")
    public List<MessageData> getConversation(@PathVariable("sessionId") String sessionId) {
        return messageService.getMessagesFromSession(sessionId);
    }
}

