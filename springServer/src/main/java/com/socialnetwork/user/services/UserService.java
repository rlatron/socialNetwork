package com.socialnetwork.user.services;

import com.socialnetwork.user.entities.User;
import com.socialnetwork.user.repositories.UserRepository;
import com.socialnetwork.user.utils.PossibleConnection;
import com.socialnetwork.user.utils.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.*;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Environment env;

    public List<User> list() {
        return userRepository.findAll();
    }

    public User save(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "There is already an account associated to this email");
        }
        int saltLength = Integer.parseInt(
                Objects.requireNonNull(env.getProperty("security.salt-length")));
        String salt = SecurityUtils.generateSalt(saltLength);
        try {
            String encryptedPassword = SecurityUtils.hashPassword(user.getPassword(), salt);
            user.setPassword(encryptedPassword);
            user.setPasswordSalt(salt);

            return userRepository.save(user);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
    }

    public User get(Long id) {

        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return userOptional.get();
    }

    public User get(String email) {

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND, "User not found");
        }
        return userOptional.get();
    }

    public User update(Long id, User user) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND, "User not found");
        }
        User existingUser = userOptional.get();
        existingUser.setName(user.getName());
        return userRepository.save(existingUser);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User authenticate(String email,String password)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND, "User not found");
        }
        User existingUser = userOptional.get();
        if (SecurityUtils.verifyPassword(password, existingUser.getPassword(),
                existingUser.getPasswordSalt())) {
            return existingUser;
        }
        else {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Password doesn't match");
        }
    }

    public void addFriend(Long id, Long idFriend) {
        User user = this.get(id);
        User newFriend = this.get(idFriend);
        user.getConnections().add(newFriend);
        newFriend.getConnections().add(user);
        //delete the friend request
        user.getRequestedFriends().remove(newFriend);
        userRepository.save(user);
    }

    public Set<User> getFriends(Long id) {
        User user = this.get(id);
        return user.getConnections();
    }

    public int friendsInCommon(User user, User otherUser) {
        Set<User> userConnections = new HashSet<>(user.getConnections());
        Set<User> otherUserConnections = new HashSet<>(otherUser.getConnections());
        userConnections.retainAll(otherUserConnections); // Calculates intersection
        return userConnections.size();
    }

    public List<PossibleConnection> getPossibleConnections (Long id) {
        User user = this.get(id);
        return userRepository.findAll().stream()
                .filter(u -> !u.equals(user) && !user.getConnections().contains(u) &&
                        !user.getRequestedFriends().contains(u) && !u.getRequestedFriends().contains(user))
                .map(u -> new PossibleConnection(u, friendsInCommon(user, u)))
                .sorted(Comparator.comparingInt(PossibleConnection::getFriendsInCommon).reversed())
                .toList();
    }

    public List<PossibleConnection> getFriendRequests (Long id) {
        User user = this.get(id);
        return user.getRequestedFriends().stream()
                .map(u -> new PossibleConnection(u, friendsInCommon(user, u)))
                .toList();
    }

    public void addFriendRequest (Long id, Long idFriend) {
        User user = this.get(id);
        User friend = this.get(idFriend);
        friend.getRequestedFriends().add(user);
        userRepository.save(friend);
    }
}