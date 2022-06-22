package didentity.amos.digitalIdentity.shared.samples;

import didentity.amos.digitalIdentity.messages.responses.CreateConnectionResponse;
import didentity.amos.digitalIdentity.messages.responses.Invitation;

public class CreateConnectionResponseSamples {
    public static CreateConnectionResponse getSample() {

        CreateConnectionResponse response = new CreateConnectionResponse();

        response.setAlias("alias");
        response.setConnectionId("connectionId");
        response.setInvitationUrl("invitationUrl");

        Invitation invitation = InvitationSamples.getSample();
        response.setInvitation(invitation);
        // TODO:AdditionalProperties
        return response;
    }
}
