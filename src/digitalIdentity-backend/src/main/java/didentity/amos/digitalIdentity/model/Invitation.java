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
"@id",
"@type",
"did",
"imageUrl",
"label",
"recipientKeys",
"routingKeys",
"serviceEndpoint"
})
@Generated("jsonschema2pojo")
public class Invitation {

@JsonProperty("@id")
private String id;
@JsonProperty("@type")
private String type;
@JsonProperty("did")
private String did;
@JsonProperty("imageUrl")
private String imageUrl;
@JsonProperty("label")
private String label;
@JsonProperty("recipientKeys")
private List<String> recipientKeys = null;
@JsonProperty("routingKeys")
private List<String> routingKeys = null;
@JsonProperty("serviceEndpoint")
private String serviceEndpoint;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("@id")
public String getId() {
return id;
}

@JsonProperty("@id")
public void setId(String id) {
this.id = id;
}

@JsonProperty("@type")
public String getType() {
return type;
}

@JsonProperty("@type")
public void setType(String type) {
this.type = type;
}

@JsonProperty("did")
public String getDid() {
return did;
}

@JsonProperty("did")
public void setDid(String did) {
this.did = did;
}

@JsonProperty("imageUrl")
public String getImageUrl() {
return imageUrl;
}

@JsonProperty("imageUrl")
public void setImageUrl(String imageUrl) {
this.imageUrl = imageUrl;
}

@JsonProperty("label")
public String getLabel() {
return label;
}

@JsonProperty("label")
public void setLabel(String label) {
this.label = label;
}

@JsonProperty("recipientKeys")
public List<String> getRecipientKeys() {
return recipientKeys;
}

@JsonProperty("recipientKeys")
public void setRecipientKeys(List<String> recipientKeys) {
this.recipientKeys = recipientKeys;
}

@JsonProperty("routingKeys")
public List<String> getRoutingKeys() {
return routingKeys;
}

@JsonProperty("routingKeys")
public void setRoutingKeys(List<String> routingKeys) {
this.routingKeys = routingKeys;
}

@JsonProperty("serviceEndpoint")
public String getServiceEndpoint() {
return serviceEndpoint;
}

@JsonProperty("serviceEndpoint")
public void setServiceEndpoint(String serviceEndpoint) {
this.serviceEndpoint = serviceEndpoint;
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
