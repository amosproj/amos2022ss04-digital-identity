package didentity.amos.digitalIdentity.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import didentity.amos.digitalIdentity.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    public User findByEmail(String email);
}