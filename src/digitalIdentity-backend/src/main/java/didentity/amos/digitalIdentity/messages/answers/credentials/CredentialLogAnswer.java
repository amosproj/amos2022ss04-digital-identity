package didentity.amos.digitalIdentity.messages.answers.credentials;

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
        "connectionAlias",
        "connectionId",
        "connectionImageUri",
        "connectionLabel",
        "id",
        "referenceId",
        "referenceImageUrl",
        "referenceName",
        "referenceState",
        "referenceType",
        "referenceTypeId",
        "timestamp"
})
@Generated("jsonschema2pojo")
public class CredentialLogAnswer {

    @JsonProperty("connectionAlias")
    private String connectionAlias;
    @JsonProperty("connectionId")
    private String connectionId;
    @JsonProperty("connectionImageUri")
    private String connectionImageUri;
    @JsonProperty("connectionLabel")
    private String connectionLabel;
    @JsonProperty("id")
    private String id;
    @JsonProperty("referenceId")
    private String referenceId;
    @JsonProperty("referenceImageUrl")
    private String referenceImageUrl;
    @JsonProperty("referenceName")
    private String referenceName;
    @JsonProperty("referenceState")
    private String referenceState;
    @JsonProperty("referenceType")
    private String referenceType;
    @JsonProperty("referenceTypeId")
    private String referenceTypeId;
    @JsonProperty("timestamp")
    private String timestamp;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("connectionAlias")
    public String getConnectionAlias() {
        return connectionAlias;
    }

    @JsonProperty("connectionAlias")
    public void setConnectionAlias(String connectionAlias) {
        this.connectionAlias = connectionAlias;
    }

    @JsonProperty("connectionId")
    public String getConnectionId() {
        return connectionId;
    }

    @JsonProperty("connectionId")
    public void setConnectionId(String connectionId) {
        this.connectionId = connectionId;
    }

    @JsonProperty("connectionImageUri")
    public String getConnectionImageUri() {
        return connectionImageUri;
    }

    @JsonProperty("connectionImageUri")
    public void setConnectionImageUri(String connectionImageUri) {
        this.connectionImageUri = connectionImageUri;
    }

    @JsonProperty("connectionLabel")
    public String getConnectionLabel() {
        return connectionLabel;
    }

    @JsonProperty("connectionLabel")
    public void setConnectionLabel(String connectionLabel) {
        this.connectionLabel = connectionLabel;
    }

    @JsonProperty("id")
    public String getId() {
        return id;
    }

    @JsonProperty("id")
    public void setId(String id) {
        this.id = id;
    }

    @JsonProperty("referenceId")
    public String getReferenceId() {
        return referenceId;
    }

    @JsonProperty("referenceId")
    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    @JsonProperty("referenceImageUrl")
    public String getReferenceImageUrl() {
        return referenceImageUrl;
    }

    @JsonProperty("referenceImageUrl")
    public void setReferenceImageUrl(String referenceImageUrl) {
        this.referenceImageUrl = referenceImageUrl;
    }

    @JsonProperty("referenceName")
    public String getReferenceName() {
        return referenceName;
    }

    @JsonProperty("referenceName")
    public void setReferenceName(String referenceName) {
        this.referenceName = referenceName;
    }

    @JsonProperty("referenceState")
    public String getReferenceState() {
        return referenceState;
    }

    @JsonProperty("referenceState")
    public void setReferenceState(String referenceState) {
        this.referenceState = referenceState;
    }

    @JsonProperty("referenceType")
    public String getReferenceType() {
        return referenceType;
    }

    @JsonProperty("referenceType")
    public void setReferenceType(String referenceType) {
        this.referenceType = referenceType;
    }

    @JsonProperty("referenceTypeId")
    public String getReferenceTypeId() {
        return referenceTypeId;
    }

    @JsonProperty("referenceTypeId")
    public void setReferenceTypeId(String referenceTypeId) {
        this.referenceTypeId = referenceTypeId;
    }

    @JsonProperty("timestamp")
    public String getTimestamp() {
        return timestamp;
    }

    @JsonProperty("timestamp")
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
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