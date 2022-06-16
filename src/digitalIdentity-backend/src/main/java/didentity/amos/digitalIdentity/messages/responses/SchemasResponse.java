package didentity.amos.digitalIdentity.messages.responses;

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
        "active",
        "alias",
        "attributes",
        "id",
        "imageUri",
        "imported",
        "timestamp",
        "version"
})
@Generated("jsonschema2pojo")
public class SchemasResponse {

    @JsonProperty("active")
    private Boolean active;
    @JsonProperty("alias")
    private String alias;
    @JsonProperty("attributes")
    private List<String> attributes = null;
    @JsonProperty("id")
    private String id;
    @JsonProperty("imageUri")
    private String imageUri;
    @JsonProperty("imported")
    private Boolean imported;
    @JsonProperty("timestamp")
    private String timestamp;
    @JsonProperty("version")
    private String version;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("active")
    public Boolean getActive() {
        return active;
    }

    @JsonProperty("active")
    public void setActive(Boolean active) {
        this.active = active;
    }

    @JsonProperty("alias")
    public String getAlias() {
        return alias;
    }

    @JsonProperty("alias")
    public void setAlias(String alias) {
        this.alias = alias;
    }

    @JsonProperty("attributes")
    public List<String> getAttributes() {
        return attributes;
    }

    @JsonProperty("attributes")
    public void setAttributes(List<String> attributes) {
        this.attributes = attributes;
    }

    @JsonProperty("id")
    public String getId() {
        return id;
    }

    @JsonProperty("id")
    public void setId(String id) {
        this.id = id;
    }

    @JsonProperty("imageUri")
    public String getImageUri() {
        return imageUri;
    }

    @JsonProperty("imageUri")
    public void setImageUri(String imageUri) {
        this.imageUri = imageUri;
    }

    @JsonProperty("imported")
    public Boolean getImported() {
        return imported;
    }

    @JsonProperty("imported")
    public void setImported(Boolean imported) {
        this.imported = imported;
    }

    @JsonProperty("timestamp")
    public String getTimestamp() {
        return timestamp;
    }

    @JsonProperty("timestamp")
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @JsonProperty("version")
    public String getVersion() {
        return version;
    }

    @JsonProperty("version")
    public void setVersion(String version) {
        this.version = version;
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