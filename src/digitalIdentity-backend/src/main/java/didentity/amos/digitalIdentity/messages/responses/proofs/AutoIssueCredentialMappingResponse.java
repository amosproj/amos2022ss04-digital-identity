package didentity.amos.digitalIdentity.messages.responses.proofs;

import java.util.HashMap;
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
        "destAttribute",
        "selfAttested",
        "providerCredDefId",
        "providerAttribute"
})
@Generated("jsonschema2pojo")
public class AutoIssueCredentialMappingResponse {

    @JsonProperty("destAttribute")
    private String destAttribute;
    @JsonProperty("selfAttested")
    private String selfAttested;
    @JsonProperty("providerCredDefId")
    private String providerCredDefId;
    @JsonProperty("providerAttribute")
    private String providerAttribute;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("destAttribute")
    public String getDestAttribute() {
        return destAttribute;
    }

    @JsonProperty("destAttribute")
    public void setDestAttribute(String destAttribute) {
        this.destAttribute = destAttribute;
    }

    @JsonProperty("selfAttested")
    public String getSelfAttested() {
        return selfAttested;
    }

    @JsonProperty("selfAttested")
    public void setSelfAttested(String selfAttested) {
        this.selfAttested = selfAttested;
    }

    @JsonProperty("providerCredDefId")
    public String getProviderCredDefId() {
        return providerCredDefId;
    }

    @JsonProperty("providerCredDefId")
    public void setProviderCredDefId(String providerCredDefId) {
        this.providerCredDefId = providerCredDefId;
    }

    @JsonProperty("providerAttribute")
    public String getProviderAttribute() {
        return providerAttribute;
    }

    @JsonProperty("providerAttribute")
    public void setProviderAttribute(String providerAttribute) {
        this.providerAttribute = providerAttribute;
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