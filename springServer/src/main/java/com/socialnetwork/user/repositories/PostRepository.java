package com.socialnetwork.user.repositories;

import com.socialnetwork.user.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByDateDesc();
}
