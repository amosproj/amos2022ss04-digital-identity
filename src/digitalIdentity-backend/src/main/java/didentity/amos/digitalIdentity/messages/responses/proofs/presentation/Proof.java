package didentity.amos.digitalIdentity.messages.responses.proofs.presentation;

import java.time.LocalDate;
import java.time.LocalTime;
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
        "deviceBindingVerificationStatus",
        "deviceBindingVerified",
        "exchangeId",
        "indyVerified",
        "state",
        "templateActive",
        "templateId",
        "templateImageUrl",
        "templateName",
        "updatedAt",
        "verified"
})
@Generated("jsonschema2pojo")
public class Proof {

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
    @JsonProperty("deviceBindingVerificationStatus")
    private String deviceBindingVerificationStatus;
    @JsonProperty("deviceBindingVerified")
    private Boolean deviceBindingVerified;
    @JsonProperty("exchangeId")
    private String exchangeId;
    @JsonProperty("indyVerified")
    private Boolean indyVerified;
    @JsonProperty("state")
    private String state;
    @JsonProperty("templateActive")
    private Boolean templateActive;
    @JsonProperty("templateId")
    private String templateId;
    @JsonProperty("templateImageUrl")
    private String templateImageUrl;
    @JsonProperty("templateName")
    private String templateName;
    @JsonProperty("updatedAt")
    private String updatedAt;
    @JsonProperty("verified")
    private Boolean verified;
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

    public LocalDate getCreatedAtLocalDate() {
        if (createdAt == null)
            return null;
        try {
            String[] str = createdAt.split("T");
            String time = str[0];
            return LocalDate.parse(time);
        } catch (Exception e) {
            return null;
        }
    }

    public LocalTime getCreatedAtLocalTime() {
        if (createdAt == null)
            return null;
        try {
            String[] str = createdAt.split("T");
            String time = str[1].replace("Z", "");
            return LocalTime.parse(time);
        } catch (Exception e) {
            return null;
        }
    }

    @JsonProperty("createdAt")
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    @JsonProperty("deviceBindingVerificationStatus")
    public String getDeviceBindingVerificationStatus() {
        return deviceBindingVerificationStatus;
    }

    @JsonProperty("deviceBindingVerificationStatus")
    public void setDeviceBindingVerificationStatus(String deviceBindingVerificationStatus) {
        this.deviceBindingVerificationStatus = deviceBindingVerificationStatus;
    }

    @JsonProperty("deviceBindingVerified")
    public Boolean getDeviceBindingVerified() {
        return deviceBindingVerified;
    }

    @JsonProperty("deviceBindingVerified")
    public void setDeviceBindingVerified(Boolean deviceBindingVerified) {
        this.deviceBindingVerified = deviceBindingVerified;
    }

    @JsonProperty("exchangeId")
    public String getExchangeId() {
        return exchangeId;
    }

    @JsonProperty("exchangeId")
    public void setExchangeId(String exchangeId) {
        this.exchangeId = exchangeId;
    }

    @JsonProperty("indyVerified")
    public Boolean getIndyVerified() {
        return indyVerified;
    }

    @JsonProperty("indyVerified")
    public void setIndyVerified(Boolean indyVerified) {
        this.indyVerified = indyVerified;
    }

    @JsonProperty("state")
    public String getState() {
        return state;
    }

    @JsonProperty("state")
    public void setState(String state) {
        this.state = state;
    }

    @JsonProperty("templateActive")
    public Boolean getTemplateActive() {
        return templateActive;
    }

    @JsonProperty("templateActive")
    public void setTemplateActive(Boolean templateActive) {
        this.templateActive = templateActive;
    }

    @JsonProperty("templateId")
    public String getTemplateId() {
        return templateId;
    }

    @JsonProperty("templateId")
    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    @JsonProperty("templateImageUrl")
    public String getTemplateImageUrl() {
        return templateImageUrl;
    }

    @JsonProperty("templateImageUrl")
    public void setTemplateImageUrl(String templateImageUrl) {
        this.templateImageUrl = templateImageUrl;
    }

    @JsonProperty("templateName")
    public String getTemplateName() {
        return templateName;
    }

    @JsonProperty("templateName")
    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    @JsonProperty("updatedAt")
    public String getUpdatedAt() {
        return updatedAt;
    }

    @JsonProperty("updatedAt")
    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    @JsonProperty("verified")
    public Boolean getVerified() {
        return verified;
    }

    @JsonProperty("verified")
    public void setVerified(Boolean verified) {
        this.verified = verified;
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
                " connectionAlias='" + getConnectionAlias() + "'" +
                ", connectionId='" + getConnectionId() + "'" +
                ", connectionImageUri='" + getConnectionImageUri() + "'" +
                ", connectionTheirLabel='" + getConnectionTheirLabel() + "'" +
                ", createdAt='" + getCreatedAt() + "'" +
                ", deviceBindingVerificationStatus='" + getDeviceBindingVerificationStatus() + "'" +
                ", deviceBindingVerified='" + getDeviceBindingVerified() + "'" +
                ", exchangeId='" + getExchangeId() + "'" +
                ", indyVerified='" + getIndyVerified() + "'" +
                ", state='" + getState() + "'" +
                ", templateActive='" + getTemplateActive() + "'" +
                ", templateId='" + getTemplateId() + "'" +
                ", templateImageUrl='" + getTemplateImageUrl() + "'" +
                ", templateName='" + getTemplateName() + "'" +
                ", updatedAt='" + getUpdatedAt() + "'" +
                ", verified='" + getVerified() + "'" +
                "}";
    }

}