package didentity.amos.digitalIdentity.shared.samples;

import java.util.ArrayList;

import didentity.amos.digitalIdentity.messages.responses.Invitation;

public class InvitationSamples {

    public static Invitation getSample() {
        Invitation invitation = new Invitation();
        invitation.setId("id");
        invitation.setType("type");
        invitation.setDid("did");
        invitation.setImageUrl("imageUrl");
        invitation.setLabel("label");

        ArrayList<String> keys = new ArrayList<String>();
        keys.add("key1");
        keys.add("key2");
        invitation.setRecipientKeys(keys);

        ArrayList<String> routingKeys = new ArrayList<String>();
        routingKeys.add("routeKey1");
        invitation.setRoutingKeys(routingKeys);

        invitation.setServiceEndpoint("serviceEndpoint");

        return invitation;
    }

}
