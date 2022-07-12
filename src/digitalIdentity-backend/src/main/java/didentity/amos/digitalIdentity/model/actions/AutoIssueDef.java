package didentity.amos.digitalIdentity.model.actions;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import didentity.amos.digitalIdentity.messages.responses.proofs.AutoIssueDefResponse;
import didentity.amos.digitalIdentity.messages.responses.proofs.AutoIssueDefMappingResponse;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "proofTemplateId",
        "goalCredDefId",
        "timeout",
        "mapping"
})
@Generated("jsonschema2pojo")
@Entity
public class AutoIssueDef {

    // TODO: alternativ: Resonse von dieser Klasse erben lassen
    public static AutoIssueDef createFromResponse(AutoIssueDefResponse response) {
        AutoIssueDef entity = new AutoIssueDef();
        entity.setGoalCredDefId(response.getGoalCredDefId());
        entity.setTimeout(response.getTimeout());

        Set<AutoIssueDefAttributesMapping> mapping = new HashSet<AutoIssueDefAttributesMapping>();
        for (AutoIssueDefMappingResponse map : response.getMapping()) {
            mapping.add(AutoIssueDefAttributesMapping.createFromResponse(map));
        }
        entity.setMapping(mapping);

        return entity;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @JsonProperty("proofTemplateId")
    @Column(nullable = false, unique = true, length = 2048)
    private String proofTemplateId;

    @JsonProperty("goalCredDefId")
    @Column(nullable = false, length = 2048)
    private String goalCredDefId;

    @JsonProperty("timeout")
    @Column(nullable = false, length = 2048)
    private String timeout;

    @JsonProperty("mapping")
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<AutoIssueDefAttributesMapping> mapping = null;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

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
    public Set<AutoIssueDefAttributesMapping> getMapping() {
        return mapping;
    }

    @JsonProperty("mapping")
    public void setMapping(Set<AutoIssueDefAttributesMapping> mapping) {
        this.mapping = mapping;
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", proofTemplateId='" + getProofTemplateId() + "'" +
                ", goalCredDefId='" + getGoalCredDefId() + "'" +
                ", timeout='" + getTimeout() + "'" +
                ", mapping='" + getMapping() + "'" +
                "}";
    }

}
