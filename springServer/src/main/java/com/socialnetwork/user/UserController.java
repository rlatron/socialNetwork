package com.socialnetwork.user;

import com.socialnetwork.user.entities.User;
import com.socialnetwork.user.services.UserService;
import com.socialnetwork.user.utils.PossibleConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping(value = "/", produces = "application/json")
    public List<User> getUsers() {
        return userService.list();
    }

    @PostMapping(value = "/new", consumes = "application/json", produces = "application/json")
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @PostMapping(value = "/authenticate", consumes = "application/json", produces = "application/json")
    public User authenticate(@RequestParam String email, @RequestParam String password)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        return userService.authenticate(email, password);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public User get(@PathVariable Long id) {
        return userService.get(id);
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public User update(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user);
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }

    @PostMapping(value = "/addFriend/{id}/{idFriend}", produces = "application/json")
    public void addFriend(@PathVariable Long id, @PathVariable Long idFriend) {
        userService.addFriend(id, idFriend);
    }

    @GetMapping(value = "/friends/{id}", produces = "application/json")
    public Set<User> getFriends(@PathVariable Long id) {
        return userService.getFriends(id);
    }

    @GetMapping(value = "/possibleConnections/{id}", produces = "application/json")
    public List<PossibleConnection> getPossibleConnections(@PathVariable Long id) {
        return userService.getPossibleConnections(id);
    }

    @GetMapping(value = "/friendRequests/{id}", produces = "application/json")
    public List<PossibleConnection> getFriendRequests(@PathVariable Long id) {
        return userService.getFriendRequests(id);
    }

    @PostMapping(value = "/requestFriend/{id}/{idFriend}", produces = "application/json")
    public void requestFriend(@PathVariable Long id, @PathVariable Long idFriend) {
        userService.addFriendRequest(id, idFriend);
    }
}