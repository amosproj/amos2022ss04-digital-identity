package didentity.amos.digitalIdentity.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import didentity.amos.digitalIdentity.model.proofs.AutoIssueCredentialAction;

public interface AutoIssueCredentialActionRepository extends CrudRepository<AutoIssueCredentialAction, Integer> {
    public Optional<AutoIssueCredentialAction> findByProofTemplateId(String proofTemplateId);
}
