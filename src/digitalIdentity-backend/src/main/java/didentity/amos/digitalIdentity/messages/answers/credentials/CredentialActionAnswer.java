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
        "connectionTheirLabel",
        "createdAt",
        "credDefActive",
        "credDefAlias",
        "credDefId",
        "credDefImageUri",
        "id",
        "schemaId",
        "state",
        "updatedAt"
})
@Generated("jsonschema2pojo")
public class CredentialActionAnswer {

    @JsonProperty("connectionAlias")
    private String connectionAlias;
    @JsonProperty("connectionId")
    private String connectionId;
    @JsonProperty("connectionImageUri")
    private String connectionImageUri;
    @JsonProperty("connectionTheirLabel")
    private String connectionTheirLabel;
    @JsonProperty("createdAt")
    private String createdAt;
    @JsonProperty("credDefActive")
    private Boolean credDefActive;
    @JsonProperty("credDefAlias")
    private String credDefAlias;
    @JsonProperty("credDefId")
    private String credDefId;
    @JsonProperty("credDefImageUri")
    private String credDefImageUri;
    @JsonProperty("id")
    private String id;
    @JsonProperty("schemaId")
    private String schemaId;
    @JsonProperty("state")
    private String state;
    @JsonProperty("updatedAt")
    private String updatedAt;
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

    @JsonProperty("connectionTheirLabel")
    public String getConnectionTheirLabel() {
        return connectionTheirLabel;
    }

    @JsonProperty("connectionTheirLabel")
    public void setConnectionTheirLabel(String connectionTheirLabel) {
        this.connectionTheirLabel = connectionTheirLabel;
    }

    @JsonProperty("createdAt")
    public String getCreatedAt() {
        return createdAt;
    }

    @JsonProperty("createdAt")
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    @JsonProperty("credDefActive")
    public Boolean getCredDefActive() {
        return credDefActive;
    }

    @JsonProperty("credDefActive")
    public void setCredDefActive(Boolean credDefActive) {
        this.credDefActive = credDefActive;
    }

    @JsonProperty("credDefAlias")
    public String getCredDefAlias() {
        return credDefAlias;
    }

    @JsonProperty("credDefAlias")
    public void setCredDefAlias(String credDefAlias) {
        this.credDefAlias = credDefAlias;
    }

    @JsonProperty("credDefId")
    public String getCredDefId() {
        return credDefId;
    }

    @JsonProperty("credDefId")
    public void setCredDefId(String credDefId) {
        this.credDefId = credDefId;
    }

    @JsonProperty("credDefImageUri")
    public String getCredDefImageUri() {
        return credDefImageUri;
    }

    @JsonProperty("credDefImageUri")
    public void setCredDefImageUri(String credDefImageUri) {
        this.credDefImageUri = credDefImageUri;
    }

    @JsonProperty("id")
    public String getId() {
        return id;
    }

    @JsonProperty("id")
    public void setId(String id) {
        this.id = id;
    }

    @JsonProperty("schemaId")
    public String getSchemaId() {
        return schemaId;
    }

    @JsonProperty("schemaId")
    public void setSchemaId(String schemaId) {
        this.schemaId = schemaId;
    }

    @JsonProperty("state")
    public String getState() {
        return state;
    }

    @JsonProperty("state")
    public void setState(String state) {
        this.state = state;
    }

    @JsonProperty("updatedAt")
    public String getUpdatedAt() {
        return updatedAt;
    }

    @JsonProperty("updatedAt")
    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
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