package didentity.amos.digitalIdentity.messages.answers.proofs;




public class ProofAnswer {

    private String connectionAlias;

    private String connectionId;

    private String connectionImageUri;

    private String connectionTheirLabel;

    private String createdAt;

    private String deviceBindingVerificationStatus;

    private Boolean deviceBindingVerified;

    private String exchangeId;

    private Boolean indyVerified;

    private String state;

    private Boolean templateActive;

    private String templateId;

    private String templateImageUrl;

    private String templateName;

    private String updatedAt;

    private Boolean verified;

    public String getConnectionAlias() {
        return connectionAlias;
    }

    public void setConnectionAlias(String connectionAlias) {
        this.connectionAlias = connectionAlias;
    }

    public String getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(String connectionId) {
        this.connectionId = connectionId;
    }

    public String getConnectionImageUri() {
        return connectionImageUri;
    }

    public void setConnectionImageUri(String connectionImageUri) {
        this.connectionImageUri = connectionImageUri;
    }

    public String getConnectionTheirLabel() {
        return connectionTheirLabel;
    }

    public void setConnectionTheirLabel(String connectionTheirLabel) {
        this.connectionTheirLabel = connectionTheirLabel;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getDeviceBindingVerificationStatus() {
        return deviceBindingVerificationStatus;
    }

    public void setDeviceBindingVerificationStatus(String deviceBindingVerificationStatus) {
        this.deviceBindingVerificationStatus = deviceBindingVerificationStatus;
    }

    public Boolean getDeviceBindingVerified() {
        return deviceBindingVerified;
    }

    public void setDeviceBindingVerified(Boolean deviceBindingVerified) {
        this.deviceBindingVerified = deviceBindingVerified;
    }

    public String getExchangeId() {
        return exchangeId;
    }

    public void setExchangeId(String exchangeId) {
        this.exchangeId = exchangeId;
    }

    public Boolean getIndyVerified() {
        return indyVerified;
    }

    public void setIndyVerified(Boolean indyVerified) {
        this.indyVerified = indyVerified;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Boolean getTemplateActive() {
        return templateActive;
    }

    public void setTemplateActive(Boolean templateActive) {
        this.templateActive = templateActive;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public String getTemplateImageUrl() {
        return templateImageUrl;
    }

    public void setTemplateImageUrl(String templateImageUrl) {
        this.templateImageUrl = templateImageUrl;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }    
}
