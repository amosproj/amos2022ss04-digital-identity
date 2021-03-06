package didentity.amos.digitalIdentity.model.actions;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import didentity.amos.digitalIdentity.messages.responses.proofs.AutoIssueDefMappingResponse;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "destAttribute",
        "selfAttested",
        "providerCredDefId",
        "providerAttribute"
})
@Generated("jsonschema2pojo")
@Entity
public class AutoIssueDefAttributesMapping {

    // TODO: alternativ: Resonse von dieser Klasse erben lassen
    public static AutoIssueDefAttributesMapping createFromResponse(AutoIssueDefMappingResponse response) {
        AutoIssueDefAttributesMapping map = new AutoIssueDefAttributesMapping();
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
    @Column(nullable = false, length = 2048)
    private String destAttribute;

    @JsonProperty("selfAttested")
    @Column(nullable = false, length = 2048)
    private boolean selfAttested;

    @JsonProperty("providerCredDefId")
    @Column(nullable = false, length = 2048)
    private String providerCredDefId;

    @JsonProperty("providerAttribute")
    @Column(nullable = false, length = 2048)
    private String providerAttribute;

    @JsonProperty("destAttribute")
    public String getDestAttribute() {
        return destAttribute;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    @JsonProperty("destAttribute")
    public void setDestAttribute(String destAttribute) {
        this.destAttribute = destAttribute;
    }

    @JsonProperty("selfAttested")
    public boolean getSelfAttested() {
        return selfAttested;
    }

    @JsonProperty("selfAttested")
    public void setSelfAttested(boolean selfAttested) {
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

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", destAttribute='" + getDestAttribute() + "'" +
                ", selfAttested='" + getSelfAttested() + "'" +
                ", providerCredDefId='" + getProviderCredDefId() + "'" +
                ", providerAttribute='" + getProviderAttribute() + "'" +
                "}";
    }

}