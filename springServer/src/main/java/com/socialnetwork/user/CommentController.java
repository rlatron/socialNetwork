package com.socialnetwork.user;

import com.socialnetwork.user.entities.Comment;
import com.socialnetwork.user.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping(value = "/{postId}/new", consumes = "application/json")
    public void writeComment (@PathVariable Long postId, @RequestBody Comment comment) {
        commentService.writeComment(comment, postId);
    }
}
