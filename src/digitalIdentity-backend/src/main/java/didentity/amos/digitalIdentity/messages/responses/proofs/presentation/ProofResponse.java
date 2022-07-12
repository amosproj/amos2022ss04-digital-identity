package didentity.amos.digitalIdentity.messages.responses.proofs.presentation;

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
        "proof",
        "revealedAttributes",
        "selfAttestedAttributes"
})
@Generated("jsonschema2pojo")
public class ProofResponse {

    @JsonProperty("proof")
    private Proof proof;

    @JsonProperty("revealedAttributes")
    private Map<String, List<Attribute>> revealedAttributes;

    @JsonProperty("selfAttestedAttributes")
    private List<Attribute> selfAttestedAttributes = null;

    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("proof")
    public Proof getProof() {
        return proof;
    }

    @JsonProperty("proof")
    public void setProof(Proof proof) {
        this.proof = proof;
    }

    @JsonProperty("revealedAttributes")
    public Map<String, List<Attribute>> getRevealedAttributes() {
        return revealedAttributes;
    }

    @JsonProperty("revealedAttributes")
    public void setRevealedAttributes(Map<String, List<Attribute>> revealedAttributes) {
        this.revealedAttributes = revealedAttributes;
    }

    @JsonProperty("selfAttestedAttributes")
    public List<Attribute> getSelfAttestedAttributes() {
        return selfAttestedAttributes;
    }

    @JsonProperty("selfAttestedAttributes")
    public void setSelfAttestedAttributes(List<Attribute> selfAttestedAttributes) {
        this.selfAttestedAttributes = selfAttestedAttributes;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

    @Override
    public String toString() {
        return "{" +
                " proof='" + getProof() + "'" +
                ", revealedAttributes='" + getRevealedAttributes() + "'" +
                ", selfAttestedAttributes='" + getSelfAttestedAttributes() + "'" +
                ", additionalProperties='" + getAdditionalProperties() + "'" +
                "}";
    }

}
