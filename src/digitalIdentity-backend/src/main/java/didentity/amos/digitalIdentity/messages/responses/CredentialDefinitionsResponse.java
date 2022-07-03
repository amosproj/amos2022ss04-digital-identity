package didentity.amos.digitalIdentity.messages.responses;

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
"id",
"alias",
"comment",
"imageUri",
"schemaId",
"active",
"revocable",
"version",
"imported"
})
@Generated("jsonschema2pojo")
public class CredentialDefinitionsResponse {

@JsonProperty("id")
private String id;
@JsonProperty("alias")
private String alias;
@JsonProperty("comment")
private String comment;
@JsonProperty("imageUri")
private String imageUri;
@JsonProperty("schemaId")
private String schemaId;
@JsonProperty("active")
private Boolean active;
@JsonProperty("revocable")
private Boolean revocable;
@JsonProperty("version")
private String version;
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

@JsonProperty("alias")
public String getAlias() {
return alias;
}

@JsonProperty("alias")
public void setAlias(String alias) {
this.alias = alias;
}

@JsonProperty("comment")
public String getComment() {
return comment;
}

@JsonProperty("comment")
public void setComment(String comment) {
this.comment = comment;
}

@JsonProperty("imageUri")
public String getImageUri() {
return imageUri;
}

@JsonProperty("imageUri")
public void setImageUri(String imageUri) {
this.imageUri = imageUri;
}

@JsonProperty("schemaId")
public String getSchemaId() {
return schemaId;
}

@JsonProperty("schemaId")
public void setSchemaId(String schemaId) {
this.schemaId = schemaId;
}

@JsonProperty("active")
public Boolean getActive() {
return active;
}

@JsonProperty("active")
public void setActive(Boolean active) {
this.active = active;
}

@JsonProperty("revocable")
public Boolean getRevocable() {
return revocable;
}

@JsonProperty("revocable")
public void setRevocable(Boolean revocable) {
this.revocable = revocable;
}

@JsonProperty("version")
public String getVersion() {
return version;
}

@JsonProperty("version")
public void setVersion(String version) {
this.version = version;
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