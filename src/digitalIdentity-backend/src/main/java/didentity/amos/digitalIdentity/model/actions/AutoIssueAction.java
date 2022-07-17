package didentity.amos.digitalIdentity.model.actions;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AutoIssueAction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false, length = 2048)
    private String proofTemplateId;

    @Column(nullable = false, length = 2048)
    private String goalConnectionId;

    @Column(nullable = false, length = 2048)
    private String exchangeId;

    public void setProofTemplateId(String proofTemplateId) {
        this.proofTemplateId = proofTemplateId;
    }

    public String getProofTemplateId() {
        return proofTemplateId;
    }

    public void setGoalConnectionId(String goalConnectionId) {
        this.goalConnectionId = goalConnectionId;
    }

    public String getGoalConnectionId() {
        return goalConnectionId;
    }

    public void setExchangeId(String exchangeId) {
        this.exchangeId = exchangeId;
    }

    public String getExchangeId() {
        return exchangeId;
    }

    @Override
    public String toString() {
        return "{" +
                ", proofTemplateId='" + getProofTemplateId() + "'" +
                ", goalConnectionId='" + getGoalConnectionId() + "'" +
                ", exchangeId='" + getExchangeId() + "'" +
                "}";
    }

}
