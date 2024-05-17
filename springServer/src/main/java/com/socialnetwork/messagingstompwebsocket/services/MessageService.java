package com.socialnetwork.messagingstompwebsocket.services;

import com.socialnetwork.messagingstompwebsocket.entities.MessageData;
import com.socialnetwork.messagingstompwebsocket.repositories.MessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class MessageService {

    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    @Autowired
    private MessageRepository messageRepository;

    public MessageData receiveMessage(MessageData messageData, String sessionId) {
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        MessageData message = new MessageData(sessionId, messageData.getFrom(), messageData.getText(), time);
        return messageRepository.save(message);
    }

    public List<MessageData> getMessagesFromSession(String sessionId) {
        return messageRepository.findBySessionIdOrderByDate(sessionId);
    }
}
