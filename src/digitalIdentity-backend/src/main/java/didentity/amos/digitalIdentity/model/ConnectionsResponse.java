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
"content",
"number",
"size",
"totalElements",
"totalPages"
})
@Generated("jsonschema2pojo")
public class ConnectionsResponse {

@JsonProperty("content")
private List<Content> content = null;
@JsonProperty("number")
private Integer number;
@JsonProperty("size")
private Integer size;
@JsonProperty("totalElements")
private Integer totalElements;
@JsonProperty("totalPages")
private Integer totalPages;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("content")
public List<Content> getContent() {
return content;
}

@JsonProperty("content")
public void setContent(List<Content> content) {
this.content = content;
}

@JsonProperty("number")
public Integer getNumber() {
return number;
}

@JsonProperty("number")
public void setNumber(Integer number) {
this.number = number;
}

@JsonProperty("size")
public Integer getSize() {
return size;
}

@JsonProperty("size")
public void setSize(Integer size) {
this.size = size;
}

@JsonProperty("totalElements")
public Integer getTotalElements() {
return totalElements;
}

@JsonProperty("totalElements")
public void setTotalElements(Integer totalElements) {
this.totalElements = totalElements;
}

@JsonProperty("totalPages")
public Integer getTotalPages() {
return totalPages;
}

@JsonProperty("totalPages")
public void setTotalPages(Integer totalPages) {
this.totalPages = totalPages;
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