package com.socialnetwork.messagingstompwebsocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class MessageController {

    @MessageMapping("/chat/{sessionId}")
    @SendTo("/topic/{sessionId}")
    public MessageData send(@DestinationVariable String sessionId, MessageData message) throws Exception {
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        return new MessageData(message.getFrom(), message.getText(), time);
    }

    /*
    @GetMapping("/conversation/{userId}")
    public ResponseEntity<List<Message>> getConversation(@PathVariable("userId") Long userId) {
        // Logic to fetch conversation messages
    }*/
}

