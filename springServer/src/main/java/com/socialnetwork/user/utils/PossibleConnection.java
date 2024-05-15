package com.socialnetwork.user.utils;

import com.socialnetwork.user.entities.User;

public class PossibleConnection {
    private User user;
    private int friendsInCommon;

    public PossibleConnection(User user, int friendsInCommon) {
        this.user = user;
        this.friendsInCommon = friendsInCommon;
    }

    public int getFriendsInCommon() {
        return friendsInCommon;
    }

    public User getUser() {
        return user;
    }
}