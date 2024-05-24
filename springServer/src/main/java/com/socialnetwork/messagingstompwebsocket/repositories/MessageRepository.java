package com.socialnetwork.messagingstompwebsocket.repositories;

import com.socialnetwork.messagingstompwebsocket.entities.MessageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageData, Long> {
    List<MessageData> findBySessionIdOrderByDate(String sessionId);

    @Transactional
    @Modifying
    @Query("UPDATE messages m SET m.viewed = :viewed WHERE m.id IN :ids")
    void updateViewedByListId(@Param("ids") List<Long> ids, @Param("viewed") boolean viewed);
}
