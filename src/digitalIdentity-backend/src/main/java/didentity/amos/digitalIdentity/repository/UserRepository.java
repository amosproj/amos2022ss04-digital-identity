package didentity.amos.digitalIdentity.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import didentity.amos.digitalIdentity.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    public Optional<User> findByEmail(String email);
    public Optional<User> findByconnectionId(String connectionId);
}