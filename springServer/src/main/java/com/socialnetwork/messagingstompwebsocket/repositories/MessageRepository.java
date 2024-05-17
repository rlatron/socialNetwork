package com.socialnetwork.messagingstompwebsocket.repositories;

import com.socialnetwork.messagingstompwebsocket.entities.MessageData;
import com.socialnetwork.user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<MessageData, Long> {
    List<MessageData> findBySessionIdOrderByDate(String sessionId);
}
