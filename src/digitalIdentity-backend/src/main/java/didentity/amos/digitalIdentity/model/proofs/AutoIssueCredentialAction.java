package didentity.amos.digitalIdentity.model.proofs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Generated;
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
public class AutoIssueCredentialAction {

    @JsonProperty("proofTemplateId")
    private String proofTemplateId;
    @JsonProperty("finaleCredDefId")
    private String finaleCredDefId;
    @JsonProperty("timeout")
    private String timeout;
    @JsonProperty("mapping")
    private List<AutoIssueCredentialMapping> mapping = null;
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

    @JsonProperty("finaleCredDefId")
    public String getFinaleCredDefId() {
        return finaleCredDefId;
    }

    @JsonProperty("finaleCredDefId")
    public void setFinaleCredDefId(String finaleCredDefId) {
        this.finaleCredDefId = finaleCredDefId;
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
    public List<AutoIssueCredentialMapping> getMapping() {
        return mapping;
    }

    @JsonProperty("mapping")
    public void setMapping(List<AutoIssueCredentialMapping> mapping) {
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
