package didentity.amos.digitalIdentity.model;

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
"id",
"version",
"alias",
"imageUri",
"active",
"attributes",
"timestamp",
"imported"
})
@Generated("jsonschema2pojo")
public class CreateSchemaResponse {

@JsonProperty("id")
private String id;
@JsonProperty("version")
private String version;
@JsonProperty("alias")
private String alias;
@JsonProperty("imageUri")
private String imageUri;
@JsonProperty("active")
private Boolean active;
@JsonProperty("attributes")
private List<String> attributes = null;
@JsonProperty("timestamp")
private String timestamp;
@JsonProperty("imported")
private Boolean imported;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("id")
public String getId() {
return id;
}

@JsonProperty("id")
public void setId(String id) {
this.id = id;
}

@JsonProperty("version")
public String getVersion() {
return version;
}

@JsonProperty("version")
public void setVersion(String version) {
this.version = version;
}

@JsonProperty("alias")
public String getAlias() {
return alias;
}

@JsonProperty("alias")
public void setAlias(String alias) {
this.alias = alias;
}

@JsonProperty("imageUri")
public String getImageUri() {
return imageUri;
}

@JsonProperty("imageUri")
public void setImageUri(String imageUri) {
this.imageUri = imageUri;
}

@JsonProperty("active")
public Boolean getActive() {
return active;
}

@JsonProperty("active")
public void setActive(Boolean active) {
this.active = active;
}

@JsonProperty("attributes")
public List<String> getAttributes() {
return attributes;
}

@JsonProperty("attributes")
public void setAttributes(List<String> attributes) {
this.attributes = attributes;
}

@JsonProperty("timestamp")
public String getTimestamp() {
return timestamp;
}

@JsonProperty("timestamp")
public void setTimestamp(String timestamp) {
this.timestamp = timestamp;
}

@JsonProperty("imported")
public Boolean getImported() {
return imported;
}

@JsonProperty("imported")
public void setImported(Boolean imported) {
this.imported = imported;
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