package didentity.amos.digitalIdentity.shared.samples;

import java.util.ArrayList;

import didentity.amos.digitalIdentity.messages.responses.CreateSchemaResponse;

public class CreateSchemaResponseSamples {
    public static CreateSchemaResponse getSample() {

        CreateSchemaResponse response = new CreateSchemaResponse();

        response.setActive(true);
        response.setAlias("alias");
        response.setAttributes(new ArrayList<String>());
        response.setId("id");
        response.setImageUri("imageUri");
        response.setImported(true);
        response.setTimestamp("timestamp");
        response.setVersion("version");

        return response;
    }
}
