package com.socialnetwork.user.services;

import com.socialnetwork.user.entities.Comment;
import com.socialnetwork.user.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public void writeComment(Comment comment, Long postId) {
        comment.setPostId(postId);
        this.commentRepository.save(comment);
    }
}
