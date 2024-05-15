package com.socialnetwork.user;

import com.socialnetwork.user.entities.User;
import com.socialnetwork.user.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    public void testAddFriends() {
        User user = new User();
        user.setId(1L);
        user.setName("Romain");
        user.setConnections(new HashSet<>());

        User otherUser = new User();
        otherUser.setId(2L);
        user.setName("Raoul");
        otherUser.setConnections(new HashSet<>());

        user.getConnections().add(otherUser);
        otherUser.getConnections().add(user);
        assertEquals(userService.friendsInCommon(user, otherUser), 0);

        User thirdUser = new User();
        otherUser.setId(3L);
        user.setName("Tomas");

        User fourthUser = new User();
        user.setName("Matias");

        User fifthUser = new User();
        user.setName("Matias");

        user.getConnections().add(thirdUser);
        user.getConnections().add(fifthUser);

        otherUser.getConnections().add(thirdUser);
        otherUser.getConnections().add(fourthUser);

        assertEquals(userService.friendsInCommon(user, otherUser), 1);

        otherUser.getConnections().add(fifthUser);
        assertEquals(userService.friendsInCommon(user, otherUser), 2);
    }
}
