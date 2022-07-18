package didentity.amos.digitalIdentity.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import didentity.amos.digitalIdentity.model.actions.AutoIssueDef;

public interface AutoIssueDefRepository extends CrudRepository<AutoIssueDef, Integer> {
    public Optional<AutoIssueDef> findByProofTemplateId(String proofTemplateId);
}
