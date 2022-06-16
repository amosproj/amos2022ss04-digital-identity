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
        "alias",
        "connectionId",
        "invitation",
        "invitationUrl"
})
@Generated("jsonschema2pojo")
public class CreateConnectionResponse {

    @JsonProperty("alias")
    private String alias;
    @JsonProperty("connectionId")
    private String connectionId;
    @JsonProperty("invitation")
    private Invitation invitation;
    @JsonProperty("invitationUrl")
    private String invitationUrl;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("alias")
    public String getAlias() {
        return alias;
    }

    @JsonProperty("alias")
    public void setAlias(String alias) {
        this.alias = alias;
    }

    @JsonProperty("connectionId")
    public String getConnectionId() {
        return connectionId;
    }

    @JsonProperty("connectionId")
    public void setConnectionId(String connectionId) {
        this.connectionId = connectionId;
    }

    @JsonProperty("invitation")
    public Invitation getInvitation() {
        return invitation;
    }

    @JsonProperty("invitation")
    public void setInvitation(Invitation invitation) {
        this.invitation = invitation;
    }

    @JsonProperty("invitationUrl")
    public String getInvitationUrl() {
        return invitationUrl;
    }

    @JsonProperty("invitationUrl")
    public void setInvitationUrl(String invitationUrl) {
        this.invitationUrl = invitationUrl;
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
