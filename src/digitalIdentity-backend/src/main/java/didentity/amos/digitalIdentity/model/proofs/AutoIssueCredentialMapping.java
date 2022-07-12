package didentity.amos.digitalIdentity.model.proofs;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import didentity.amos.digitalIdentity.messages.responses.proofs.AutoIssueCredentialMappingResponse;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "destAttribute",
        "selfAttested",
        "providerCredDefId",
        "providerAttribute"
})
@Generated("jsonschema2pojo")
@Entity
public class AutoIssueCredentialMapping {

    // TODO: alternativ: Resonse von dieser Klasse erben lassen
    public static AutoIssueCredentialMapping createFromResponse(AutoIssueCredentialMappingResponse response) {
        AutoIssueCredentialMapping map = new AutoIssueCredentialMapping();
        map.setDestAttribute(response.getDestAttribute());
        map.setSelfAttested(response.getSelfAttested());
        map.setProviderCredDefId(response.getProviderCredDefId());
        map.setProviderAttribute(response.getProviderAttribute());
        return map;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @JsonProperty("destAttribute")
    private String destAttribute;
    @JsonProperty("selfAttested")
    private String selfAttested;
    @JsonProperty("providerCredDefId")
    private String providerCredDefId;
    @JsonProperty("providerAttribute")
    private String providerAttribute;

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

}