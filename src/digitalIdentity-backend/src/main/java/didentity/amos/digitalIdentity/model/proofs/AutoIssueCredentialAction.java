package didentity.amos.digitalIdentity.model.proofs;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import didentity.amos.digitalIdentity.messages.responses.proofs.AutoIssueCredentialActionResponse;
import didentity.amos.digitalIdentity.messages.responses.proofs.AutoIssueCredentialMappingResponse;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "proofTemplateId",
        "goalCredDefId",
        "timeout",
        "mapping"
})
@Generated("jsonschema2pojo")
@Entity
public class AutoIssueCredentialAction {

    // TODO: alternativ: Resonse von dieser Klasse erben lassen
    public static AutoIssueCredentialAction createFromResponse(AutoIssueCredentialActionResponse response) {
        AutoIssueCredentialAction entity = new AutoIssueCredentialAction();
        entity.setGoalCredDefId(response.getGoalCredDefId());
        entity.setTimeout(response.getTimeout());

        Set<AutoIssueCredentialMapping> mapping = new HashSet<AutoIssueCredentialMapping>();
        for (AutoIssueCredentialMappingResponse map : response.getMapping()) {
            mapping.add(AutoIssueCredentialMapping.createFromResponse(map));
        }
        entity.setMapping(mapping);

        return entity;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @JsonProperty("proofTemplateId")
    @Column(nullable = false, unique = true)
    private String proofTemplateId;
    @JsonProperty("goalCredDefId")
    private String goalCredDefId;
    @JsonProperty("timeout")
    private String timeout;

    @JsonProperty("mapping")
    @OneToMany(cascade = CascadeType.ALL)
    private Set<AutoIssueCredentialMapping> mapping = null;

    @JsonProperty("proofTemplateId")
    public String getProofTemplateId() {
        return proofTemplateId;
    }

    @JsonProperty("proofTemplateId")
    public void setProofTemplateId(String proofTemplateId) {
        this.proofTemplateId = proofTemplateId;
    }

    @JsonProperty("goalCredDefId")
    public String getGoalCredDefId() {
        return goalCredDefId;
    }

    @JsonProperty("goalCredDefId")
    public void setGoalCredDefId(String goalCredDefId) {
        this.goalCredDefId = goalCredDefId;
    }

    @JsonProperty("timeout")
    public String getTimeout() {
        return timeout;
    }

    @JsonProperty("timeout")
    public void setTimeout(String timeout) {
        this.timeout = timeout;
    }

    @JsonProperty("mapping")
    public Set<AutoIssueCredentialMapping> getMapping() {
        return mapping;
    }

    @JsonProperty("mapping")
    public void setMapping(Set<AutoIssueCredentialMapping> mapping) {
        this.mapping = mapping;
    }

}
