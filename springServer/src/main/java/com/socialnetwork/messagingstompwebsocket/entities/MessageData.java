package com.socialnetwork.messagingstompwebsocket.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "messages")
public class MessageData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;
    private String sessionId;
    @Column(name = "sender")
    private String from;
    private String text;
    private String time;
    private Date date;

    public MessageData() {
    }

    public MessageData(String sessionId, String from, String text, String time) {
        this.sessionId = sessionId;
        this.from = from;
        this.text = text;
        this.time = time;
        this.date = new Date();
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
