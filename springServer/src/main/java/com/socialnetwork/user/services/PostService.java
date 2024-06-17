package com.socialnetwork.user.services;

import com.socialnetwork.user.entities.Post;
import com.socialnetwork.user.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public void writePost(Post post) {
        this.postRepository.save(post);
    }

    public List<Post> getMostRecentPosts(){
        return postRepository.findAllByOrderByDateDesc();
    }
}
