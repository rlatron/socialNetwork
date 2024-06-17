package com.socialnetwork.user;

import com.socialnetwork.user.entities.Post;
import com.socialnetwork.user.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("post")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping(value = "/new", consumes = "application/json")
    public void writePost (@RequestBody Post post) {
        postService.writePost(post);
    }

    @GetMapping(value = "/feed", produces =  "application/json")
    public List<Post> getFeed() {
        return postService.getMostRecentPosts();
    }
}
