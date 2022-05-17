package didentity.amos.digitalIdentity.repository;

import org.springframework.data.repository.CrudRepository;

import didentity.amos.digitalIdentity.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}