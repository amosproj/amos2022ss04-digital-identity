package didentity.amos.digitalIdentity.messages.responses.proofs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "proofTemplateId",
        "goalCredDefId",
        "timeout",
        "mapping"
})
@Generated("jsonschema2pojo")
public class AutoIssueDefResponse {

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
    private List<AutoIssueDefMappingResponse> mapping = null;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

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
    public List<AutoIssueDefMappingResponse> getMapping() {
        return mapping;
    }

    @JsonProperty("mapping")
    public void setMapping(List<AutoIssueDefMappingResponse> mapping) {
        this.mapping = mapping;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
