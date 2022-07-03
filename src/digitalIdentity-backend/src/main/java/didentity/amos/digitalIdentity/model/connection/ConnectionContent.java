package didentity.amos.digitalIdentity.model.connection;

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
"createdAt",
"updatedAt",
"state",
"theirRole",
"myDid",
"theirDid",
"myLabel",
"theirLabel",
"alias",
"imageUri",
"accept"
})
@Generated("jsonschema2pojo")
public class ConnectionContent {

@JsonProperty("id")
private String id;
@JsonProperty("createdAt")
private String createdAt;
@JsonProperty("updatedAt")
private String updatedAt;
@JsonProperty("state")
private String state;
@JsonProperty("theirRole")
private String theirRole;
@JsonProperty("myDid")
private String myDid;
@JsonProperty("theirDid")
private String theirDid;
@JsonProperty("myLabel")
private String myLabel;
@JsonProperty("theirLabel")
private String theirLabel;
@JsonProperty("alias")
private String alias;
@JsonProperty("imageUri")
private String imageUri;
@JsonProperty("accept")
private String accept;
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

@JsonProperty("createdAt")
public String getCreatedAt() {
return createdAt;
}

@JsonProperty("createdAt")
public void setCreatedAt(String createdAt) {
this.createdAt = createdAt;
}

@JsonProperty("updatedAt")
public String getUpdatedAt() {
return updatedAt;
}

@JsonProperty("updatedAt")
public void setUpdatedAt(String updatedAt) {
this.updatedAt = updatedAt;
}

@JsonProperty("state")
public String getState() {
return state;
}

@JsonProperty("state")
public void setState(String state) {
this.state = state;
}

@JsonProperty("theirRole")
public String getTheirRole() {
return theirRole;
}

@JsonProperty("theirRole")
public void setTheirRole(String theirRole) {
this.theirRole = theirRole;
}

@JsonProperty("myDid")
public String getMyDid() {
return myDid;
}

@JsonProperty("myDid")
public void setMyDid(String myDid) {
this.myDid = myDid;
}

@JsonProperty("theirDid")
public String getTheirDid() {
return theirDid;
}

@JsonProperty("theirDid")
public void setTheirDid(String theirDid) {
this.theirDid = theirDid;
}

@JsonProperty("myLabel")
public String getMyLabel() {
return myLabel;
}

@JsonProperty("myLabel")
public void setMyLabel(String myLabel) {
this.myLabel = myLabel;
}

@JsonProperty("theirLabel")
public String getTheirLabel() {
return theirLabel;
}

@JsonProperty("theirLabel")
public void setTheirLabel(String theirLabel) {
this.theirLabel = theirLabel;
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

@JsonProperty("accept")
public String getAccept() {
return accept;
}

@JsonProperty("accept")
public void setAccept(String accept) {
this.accept = accept;
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